"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload, type RegisterPayload } from "@/lib/api/auth";
import { queryKeys } from "@/lib/api/query-keys";
import { tokenStore } from "@/lib/api/token-store";
import type { AuthUser } from "@/lib/api/types";

/** Current authenticated user (null when logged out). */
export function useCurrentUser() {
  return useQuery<AuthUser | null>({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      if (!tokenStore.get()) return null;
      try {
        return await authApi.me();
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60_000,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (user) => qc.setQueryData(queryKeys.auth.me, user),
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (user) => qc.setQueryData(queryKeys.auth.me, user),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      qc.setQueryData(queryKeys.auth.me, null);
      qc.clear();
    },
  });
}
