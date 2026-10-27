"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "cn";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLogout } from "@/hooks/useAuth";

const navItems = [
  { label: "Overview",  href: "/admin",          icon: LayoutDashboard },
  { label: "Products",  href: "/admin/products",  icon: Package },
  { label: "Orders",    href: "/admin/orders",    icon: ShoppingCart },
  { label: "Customers", href: "/admin/users",     icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, { onSuccess: () => router.push("/login") });
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[#f4dedb] bg-white px-4 md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#fce8e6]">
            <Sparkles className="size-3.5 text-[#a84759]" />
          </div>
          <span className="font-heading font-bold text-[#713944]">Kenlivo</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-1.5 text-[#65454b] hover:bg-[#fce8e6]"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#492a30] transition-transform duration-200",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-5 border-b border-white/10">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#fce8e6]">
            <Sparkles className="size-4 text-[#a84759]" />
          </div>
          <div>
            <p className="font-heading font-bold leading-none text-white">Kenlivo</p>
            <p className="text-[10px] text-[#f2bdba]/70 mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-[#c96778] text-white shadow-sm"
                  : "text-[#f2bdba]/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-3 py-4">
          <button
            onClick={handleLogout}
            disabled={logout.isPending}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#f2bdba]/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <LogOut className="size-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Top spacer for mobile */}
      <div className="h-14 md:hidden" />
    </>
  );
}
