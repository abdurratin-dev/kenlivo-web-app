"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api/orders";
import { queryKeys } from "@/lib/api/query-keys";
import type { OrderListQuery, OrderStatus } from "@/lib/api/types";

export function useAdminOrders(query: OrderListQuery = {}) {
  return useQuery({
    queryKey: [...queryKeys.orders.all, query],
    queryFn: () => ordersApi.listAll(query),
  });
}

export function useMyOrders(query: OrderListQuery = {}) {
  return useQuery({
    queryKey: [...queryKeys.orders.mine, query],
    queryFn: () => ordersApi.listMine(query),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => ordersApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.orders.all }),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ordersApi.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all });
      qc.invalidateQueries({ queryKey: queryKeys.orders.mine });
    },
  });
}
