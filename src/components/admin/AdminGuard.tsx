"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useAuth";
import { tokenStore } from "@/lib/api/token-store";
import { Loader2 } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const hasToken = !!tokenStore.get();
    if (!hasToken) {
      router.replace("/login");
      return;
    }
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [mounted, user, isLoading, router]);

  // Before hydration: render nothing — server and client agree
  if (!mounted) return null;

  const hasToken = !!tokenStore.get();

  // No token — blank while redirect fires
  if (!hasToken) return null;

  // Token present, query resolving
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff8f6]">
        <Loader2 className="size-8 animate-spin text-[#c96778]" />
      </div>
    );
  }

  // Not admin
  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
}
