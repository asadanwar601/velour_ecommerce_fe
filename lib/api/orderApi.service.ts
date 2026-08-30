import apiClient from '../axios';
import { CheckoutPayload, Order, ReturnItemRequest, ReturnRecord } from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function checkout(payload: CheckoutPayload): Promise<{ orderNumber: string; order: Order }> {
  const response = await apiClient.post('/orders/checkout', payload);
  return unwrapApiResponse<{ orderNumber: string; order: Order }>(response);
}

export async function getUserOrders(): Promise<Order[]> {
  const response = await apiClient.get('/orders/my-orders');
  return unwrapApiResponse<Order[]>(response);
}

export async function getOrderById(orderIdentifier: string): Promise<Order> {
  const response = await apiClient.get(`/orders/${orderIdentifier}`);
  return unwrapApiResponse<Order>(response);
}

export async function cancelOrder(orderIdentifier: string, cancellationReason?: string): Promise<{ message: string; order: Order }> {
  const response = await apiClient.post(`/orders/${orderIdentifier}/cancel`, { reason: cancellationReason });
  return unwrapApiResponse<{ message: string; order: Order }>(response);
}

export async function reorderItems(orderIdentifier: string): Promise<{ message: string; cart: any }> {
  const response = await apiClient.post(`/orders/${orderIdentifier}/reorder`);
  return unwrapApiResponse<{ message: string; cart: any }>(response);
}

export async function getOrderTrackingTimeline(orderIdentifier: string): Promise<any> {
  const response = await apiClient.get(`/orders/${orderIdentifier}/tracking`);
  return unwrapApiResponse<any>(response);
}

export async function createReturnRequest(
  orderIdentifier: string,
  returnPayload: { reason: string; comments?: string; items: ReturnItemRequest[] },
): Promise<{ message: string; return: ReturnRecord }> {
  const response = await apiClient.post(`/orders/${orderIdentifier}/returns`, returnPayload);
  return unwrapApiResponse<{ message: string; return: ReturnRecord }>(response);
}

export async function getOrderReturns(orderIdentifier: string): Promise<ReturnRecord[]> {
  const response = await apiClient.get(`/orders/${orderIdentifier}/returns`);
  return unwrapApiResponse<ReturnRecord[]>(response);
}

export async function downloadOrderInvoicePdf(orderId: string, orderNumber?: string): Promise<void> {
  const response = await apiClient.get(`/orders/${orderId}/invoice`, {
    responseType: 'blob',
  });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', `Invoice-${orderNumber || orderId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
