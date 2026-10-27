"use client";

import { useState } from "react";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { Loader2, ShoppingCart } from "lucide-react";
import { getApiErrorMessage } from "@/lib/api/axios";
import { colors } from "@/lib/theme";
import type { Order, OrderStatus } from "@/lib/api/types";

const ORDER_STATUSES: OrderStatus[] = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminOrders({ status: statusFilter || undefined, page, limit: 20 });
  const updateStatus = useUpdateOrderStatus();
  const [error, setError] = useState<string | null>(null);

  const orders = data?.items ?? [];
  const meta = data?.meta;

  const handleStatus = async (order: Order, status: OrderStatus) => {
    setError(null);
    try {
      await updateStatus.mutateAsync({ id: order._id, status });
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update order"));
    }
  };

  const badge = (s: OrderStatus) => colors.status[s] ?? { bg: "#f4f4f4", text: "#555" };

  const userName = (o: Order) => {
    if (!o.user) return "—";
    if (typeof o.user === "object") return o.user.name;
    return String(o.user).slice(-6);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-[#492a30]">Orders</h1>
          {meta && <p className="mt-0.5 text-sm text-[#987b7e]">{meta.total} total</p>}
        </div>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setStatusFilter(""); setPage(1); }}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${statusFilter === "" ? "bg-[#c96778] text-white" : "border border-[#ead8d7] text-[#65454b] hover:bg-[#fff5f3]"}`}
        >
          All
        </button>
        {ORDER_STATUSES.map((s) => {
          const b = badge(s);
          return (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${statusFilter === s ? "ring-2 ring-[#c96778]" : ""}`}
              style={{ background: b.bg, color: b.text }}
            >
              {s}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#B95770]" /></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#f4dedb] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#f4dedb] bg-[#fff8f6]">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Order ID</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Customer</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Items</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Total</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4dedb]">
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <ShoppingCart className="mx-auto mb-2 size-8 text-[#c2aaab]" />
                      <p className="text-sm text-[#987b7e]">No orders found.</p>
                    </td>
                  </tr>
                )}
                {orders.map((o) => {
                  const b = badge(o.status);
                  return (
                    <tr key={o._id} className="transition hover:bg-[#fff8f6]">
                      <td className="px-4 py-3 font-mono text-xs text-[#65454b]">#{o._id.slice(-8).toUpperCase()}</td>
                      <td className="px-4 py-3 text-[#492a30]">{userName(o)}</td>
                      <td className="px-4 py-3 text-[#65454b]">{o.items.length} item{o.items.length !== 1 ? "s" : ""}</td>
                      <td className="px-4 py-3 font-medium text-[#492a30]">৳{o.grandTotal.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize" style={{ background: b.bg, color: b.text }}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#987b7e]">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatus(o, e.target.value as OrderStatus)}
                          disabled={updateStatus.isPending}
                          className="rounded-lg border border-[#ead8d7] bg-white px-2 py-1 text-xs text-[#492a30] outline-none focus:border-[#c66f7d] disabled:opacity-50"
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s} className="capitalize">{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#f4dedb] px-4 py-3">
              <p className="text-xs text-[#987b7e]">Page {meta.page} of {meta.totalPages}</p>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-[#ead8d7] px-3 py-1 text-xs text-[#65454b] hover:bg-[#fff5f3] disabled:opacity-40">Prev</button>
                <button onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))} disabled={page === meta.totalPages} className="rounded-lg border border-[#ead8d7] px-3 py-1 text-xs text-[#65454b] hover:bg-[#fff5f3] disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
