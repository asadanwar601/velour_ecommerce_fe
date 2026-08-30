'use client';

import React, { useState } from 'react';
import { Order, ReturnItemRequest } from '@/lib/types';
import { useOrders, useCart } from '@/lib/store';
import { CloseIcon, CheckIcon } from './Icons';
import { OrderTrackingTimelineView } from './orders/OrderTrackingTimelineView';
import { OrderCancelModalView } from './orders/OrderCancelModalView';
import { OrderReturnModalView } from './orders/OrderReturnModalView';
import { OrderInvoiceModalView } from './orders/OrderInvoiceModalView';

interface OrderTrackingModalProps {
  order: Order | null;
  onClose: () => void;
}

type ModalView = 'details' | 'cancel' | 'return' | 'invoice';

export default function OrderTrackingModal({ order, onClose }: OrderTrackingModalProps) {
  const { cancelOrder, requestRefund } = useOrders();
  const { addItem, openCartDrawer } = useCart();

  const [activeView, setActiveView] = useState<ModalView>('details');
  const [cancelReason, setCancelReason] = useState('Found alternative atelier piece');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedReturnItems, setSelectedReturnItems] = useState<
    Record<string, { quantity: number; reason: string; selected: boolean }>
  >({});
  const [returnMethod, setReturnMethod] = useState<'ORIGINAL_PAYMENT' | 'STORE_CREDIT'>('STORE_CREDIT');

  if (!order) return null;

  const handleOpenReturn = () => {
    const initial: Record<string, { quantity: number; reason: string; selected: boolean }> = {};
    order.items.forEach((it) => {
      initial[it.id] = {
        quantity: it.quantity,
        reason: 'Sizing ran slightly large',
        selected: true,
      };
    });
    setSelectedReturnItems(initial);
    setActiveView('return');
  };

  const handleToggleReturnItem = (id: string) => {
    setSelectedReturnItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id]?.selected },
    }));
  };

  const handleChangeReturnReason = (id: string, reason: string) => {
    setSelectedReturnItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], reason },
    }));
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const reason = cancelReason === 'Other' ? customReason : cancelReason;
      await cancelOrder(order.id, reason);
      setActiveView('details');
    } catch (err: any) {
      alert(err.message || 'Failed to cancel order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemsToReturn: ReturnItemRequest[] = [];
    order.items.forEach((it) => {
      const config = selectedReturnItems[it.id];
      if (config && config.selected && config.quantity > 0) {
        itemsToReturn.push({
          productId: it.productId,
          productName: it.product?.name || 'Luxury Garment',
          size: it.size,
          quantity: config.quantity,
          price: it.price,
          reason: config.reason,
        });
      }
    });

    if (itemsToReturn.length === 0) {
      alert('Please select at least one piece to return.');
      return;
    }

    setIsSubmitting(true);
    try {
      await requestRefund(order.id, { items: itemsToReturn, returnMethod });
      setActiveView('details');
    } catch (err: any) {
      alert(err.message || 'Return submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReorder = async (targetOrder: Order) => {
    for (const item of targetOrder.items) {
      if (item.product) {
        await addItem(item.product, item.size, item.quantity);
      }
    }
    onClose();
    openCartDrawer();
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white border border-sand-200 rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold block">
              Atelier Order Tracking
            </span>
            <h3 className="font-serif text-xl text-neutral-900">{order.orderNumber}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
            <CloseIcon size={20} />
          </button>
        </div>

        {activeView === 'details' && (
          <OrderTrackingTimelineView
            order={order}
            onOpenCancel={() => setActiveView('cancel')}
            onOpenReturn={handleOpenReturn}
            onOpenInvoice={() => setActiveView('invoice')}
            onReorder={handleReorder}
          />
        )}

        {activeView === 'cancel' && (
          <OrderCancelModalView
            orderNumber={order.orderNumber}
            cancelReason={cancelReason}
            onCancelReasonChange={setCancelReason}
            customReason={customReason}
            onCustomReasonChange={setCustomReason}
            isSubmitting={isSubmitting}
            onSubmit={handleCancelSubmit}
            onBack={() => setActiveView('details')}
          />
        )}

        {activeView === 'return' && (
          <OrderReturnModalView
            order={order}
            selectedItems={selectedReturnItems}
            onToggleItem={handleToggleReturnItem}
            onChangeReason={handleChangeReturnReason}
            returnMethod={returnMethod}
            onReturnMethodChange={setReturnMethod}
            isSubmitting={isSubmitting}
            onSubmit={handleReturnSubmit}
            onBack={() => setActiveView('details')}
          />
        )}

        {activeView === 'invoice' && (
          <OrderInvoiceModalView
            order={order}
            onBack={() => setActiveView('details')}
          />
        )}
      </div>
    </div>
  );
}
