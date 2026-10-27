import { api } from "./axios";
import type { AdminUser, ApiEnvelope, UserListQuery } from "./types";

export const usersApi = {
  async listAll(query: UserListQuery = {}) {
    const { data } = await api.get<ApiEnvelope<AdminUser[]>>("/users", { params: query });
    return { items: data.data, meta: data.meta };
  },

  async update(id: string, payload: Partial<Pick<AdminUser, "name" | "email" | "phone" | "isActive" | "role">>) {
    const { data } = await api.patch<ApiEnvelope<AdminUser>>(`/users/${id}`, payload);
    return data.data;
  },

  async remove(id: string) {
    await api.delete(`/users/${id}`);
  },
};
