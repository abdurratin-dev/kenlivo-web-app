"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi, productsApi, type ProductInput } from "@/lib/api/products";
import { queryKeys } from "@/lib/api/query-keys";
import type { ProductListQuery } from "@/lib/api/types";

export function useProducts(query: ProductListQuery = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(query),
    queryFn: () => productsApi.list(query),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.list,
    queryFn: () => categoriesApi.list(),
    staleTime: 10 * 60_000,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductInput) => productsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.products.all }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProductInput> }) =>
      productsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.products.all }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.products.all }),
  });
}
