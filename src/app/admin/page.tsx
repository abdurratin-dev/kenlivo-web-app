"use client";

import { useCurrentUser } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { useAdminOrders } from "@/hooks/useOrders";
import { useAdminUsers } from "@/hooks/useUsers";
import { Loader2, ShieldAlert, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { colors } from "@/lib/theme";
import Link from "next/link";
import { useMemo } from "react";

const statusBadge: Record<string, { bg: string; text: string }> = colors.status;

export default function AdminOverview() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: productsData } = useProducts({ limit: 1 });
  const { data: ordersData } = useAdminOrders({ limit: 100 });
  const { data: usersData } = useAdminUsers({ limit: 1 });

  const orders = ordersData?.items ?? [];
  const totalRevenue = useMemo(
    () => orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.grandTotal, 0),
    [orders],
  );

  const ordersByStatus = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) => { map[o.status] = (map[o.status] ?? 0) + 1; });
    return map;
  }, [orders]);

  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [orders],
  );

  if (userLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="animate-spin text-[#B95770]" /></div>;
  }
  if (!user || user.role !== "admin") {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <ShieldAlert className="text-[#B95770]" size={40} />
        <h1 className="font-heading text-2xl text-[#171717]">Admin access required</h1>
      </section>
    );
  }

  const stats = [
    { label: "Total Products", value: productsData?.meta?.total ?? "—", icon: Package,      href: "/admin/products", color: "#fce8e6", iconColor: "#a84759" },
    { label: "Total Orders",   value: ordersData?.meta?.total ?? orders.length, icon: ShoppingCart, href: "/admin/orders",   color: "#dbeafe", iconColor: "#1e40af" },
    { label: "Customers",      value: usersData?.meta?.total ?? "—",  icon: Users,        href: "/admin/users",    color: "#d1fae5", iconColor: "#065f46" },
    { label: "Revenue (TK)",   value: `৳${totalRevenue.toLocaleString()}`, icon: TrendingUp, href: "/admin/orders",   color: "#fef9c3", iconColor: "#854d0e" },
  ];

  return (
    <div className="space-y-8 pt-2">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-[#492a30]">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-[#987b7e]">Welcome back, {user.name}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, color, iconColor }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-[#f4dedb] bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: color }}>
                <Icon className="size-5" style={{ color: iconColor }} />
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-[#492a30]">{value}</p>
            <p className="mt-0.5 text-xs text-[#987b7e]">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order status breakdown */}
        <div className="rounded-2xl border border-[#f4dedb] bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-heading text-base font-semibold text-[#492a30]">Orders by Status</h2>
          {Object.keys(statusBadge).map((s) => {
            const count = ordersByStatus[s] ?? 0;
            const total = orders.length || 1;
            return (
              <div key={s} className="mb-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="capitalize text-[#65454b]">{s}</span>
                  <span className="font-medium text-[#492a30]">{count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f4dedb]">
                  <div
                    className="h-full rounded-full bg-[#c96778] transition-all"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent orders */}
        <div className="rounded-2xl border border-[#f4dedb] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold text-[#492a30]">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#b94f64] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 && (
              <p className="py-4 text-center text-sm text-[#987b7e]">No orders yet.</p>
            )}
            {recentOrders.map((o) => {
              const badge = statusBadge[o.status] ?? { bg: "#f4f4f4", text: "#555" };
              return (
                <div key={o._id} className="flex items-center justify-between rounded-xl bg-[#fff8f6] px-3 py-2.5">
                  <div>
                    <p className="text-xs font-medium text-[#492a30]">#{o._id.slice(-6).toUpperCase()}</p>
                    <p className="text-[11px] text-[#987b7e]">৳{o.grandTotal.toLocaleString()}</p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {o.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
