import { api } from "./axios";
import { tokenStore } from "./token-store";
import type { ApiEnvelope, AuthUser } from "./types";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResult {
  user: AuthUser;
  accessToken: string;
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthUser> {
    const { data } = await api.post<ApiEnvelope<AuthResult>>("/auth/register", payload);
    tokenStore.set(data.data.accessToken);
    return data.data.user;
  },

  async login(payload: LoginPayload): Promise<AuthUser> {
    const { data } = await api.post<ApiEnvelope<AuthResult>>("/auth/login", payload);
    tokenStore.set(data.data.accessToken);
    return data.data.user;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      tokenStore.clear();
    }
  },

  async me(): Promise<AuthUser> {
    const { data } = await api.get<ApiEnvelope<AuthUser>>("/auth/me");
    return data.data;
  },
};
