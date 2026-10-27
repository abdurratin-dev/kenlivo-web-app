import { api } from "./axios";
import type { ApiEnvelope, Order, OrderListQuery, OrderStatus } from "./types";

export const ordersApi = {
  async listAll(query: OrderListQuery = {}) {
    const { data } = await api.get<ApiEnvelope<Order[]>>("/orders", { params: query });
    return { items: data.data, meta: data.meta };
  },

  async listMine(query: OrderListQuery = {}) {
    const { data } = await api.get<ApiEnvelope<Order[]>>("/orders/me", { params: query });
    return { items: data.data, meta: data.meta };
  },

  async getById(id: string) {
    const { data } = await api.get<ApiEnvelope<Order>>(`/orders/${id}`);
    return data.data;
  },

  async updateStatus(id: string, status: OrderStatus) {
    const { data } = await api.patch<ApiEnvelope<Order>>(`/orders/${id}/status`, { status });
    return data.data;
  },

  async cancel(id: string) {
    const { data } = await api.patch<ApiEnvelope<Order>>(`/orders/${id}/cancel`);
    return data.data;
  },
};
