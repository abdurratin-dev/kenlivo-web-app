"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import { queryKeys } from "@/lib/api/query-keys";
import type { AdminUser, UserListQuery } from "@/lib/api/types";

export function useAdminUsers(query: UserListQuery = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(query as Record<string, unknown>),
    queryFn: () => usersApi.listAll(query),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<AdminUser> }) =>
      usersApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}
