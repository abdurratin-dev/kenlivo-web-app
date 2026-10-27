"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useAuth";
import { tokenStore } from "@/lib/api/token-store";
import { Loader2 } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // Lazy init: reads localStorage once on client mount
  const [hasToken] = useState(() => {
    if (typeof window === "undefined") return true; // SSR: let it through, client will verify
    return !!tokenStore.get();
  });
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!hasToken) {
      router.replace("/login");
      return;
    }
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [hasToken, user, isLoading, router]);

  // No token — show nothing while redirect fires
  if (!hasToken) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff8f6]">
        <Loader2 className="size-8 animate-spin text-[#c96778]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
}
