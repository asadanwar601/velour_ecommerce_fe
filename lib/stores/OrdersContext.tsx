'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Order, ReturnItemRequest } from '../types';
import * as orderApi from '../api/orderApi.service';
import { getStoredToken } from '../axios';

interface OrdersContextType {
  orders: Order[];
  isLoadingOrders: boolean;
  refreshOrders: () => Promise<Order[]>;
  cancelOrder: (orderId: string, reason: string) => Promise<Order>;
  requestRefund: (
    orderId: string,
    returnData: {
      items: ReturnItemRequest[];
      returnMethod: 'ORIGINAL_PAYMENT' | 'STORE_CREDIT';
    },
  ) => Promise<Order>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const refreshOrders = useCallback(async (): Promise<Order[]> => {
    const currentToken = getStoredToken();
    if (!currentToken) {
      setOrders([]);
      setIsLoadingOrders(false);
      return [];
    }
    try {
      setIsLoadingOrders(true);
      const retrievedOrders = await orderApi.getUserOrders();
      setOrders(retrievedOrders);
      return retrievedOrders;
    } catch (error) {
      console.warn('[Orders] Failed to load orders:', error);
      return [];
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  const cancelOrder = useCallback(
    async (orderId: string, cancellationReason: string): Promise<Order> => {
      const response = await orderApi.cancelOrder(orderId, cancellationReason);
      await refreshOrders();
      return response.order;
    },
    [refreshOrders],
  );

  const requestRefund = useCallback(
    async (
      orderId: string,
      returnData: {
        items: ReturnItemRequest[];
        returnMethod: 'ORIGINAL_PAYMENT' | 'STORE_CREDIT';
      },
    ): Promise<Order> => {
      await orderApi.createReturnRequest(orderId, {
        reason: 'Refund Request',
        items: returnData.items,
      });
      await refreshOrders();
      return orderApi.getOrderById(orderId);
    },
    [refreshOrders],
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoadingOrders,
        refreshOrders,
        cancelOrder,
        requestRefund,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
