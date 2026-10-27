/**
 * In-memory + localStorage access-token store.
 * The refresh token lives in an httpOnly cookie set by the API, so it is
 * never exposed to JS. Only the short-lived access token is kept here.
 */
const STORAGE_KEY = "kenlivo.accessToken";

let accessToken: string | null = null;

export const tokenStore = {
  get(): string | null {
    if (accessToken) return accessToken;
    if (typeof window !== "undefined") {
      accessToken = window.localStorage.getItem(STORAGE_KEY);
    }
    return accessToken;
  },
  set(token: string | null) {
    accessToken = token;
    if (typeof window === "undefined") return;
    if (token) window.localStorage.setItem(STORAGE_KEY, token);
    else window.localStorage.removeItem(STORAGE_KEY);
  },
  clear() {
    this.set(null);
  },
};
