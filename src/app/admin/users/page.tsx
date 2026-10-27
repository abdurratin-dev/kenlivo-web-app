"use client";

import { useState } from "react";
import { useAdminUsers, useUpdateUser, useDeleteUser } from "@/hooks/useUsers";
import { Loader2, Users, Pencil, Trash2, Check, X, Search } from "lucide-react";
import { getApiErrorMessage } from "@/lib/api/axios";
import type { AdminUser } from "@/lib/api/types";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminUsers({ search: search || undefined, page, limit: 20, sort: "-createdAt" });
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const users = data?.items ?? [];
  const meta = data?.meta;

  const startEdit = (u: AdminUser) => { setEditId(u._id); setEditName(u.name); };
  const cancelEdit = () => { setEditId(null); setEditName(""); };

  const saveEdit = async (u: AdminUser) => {
    if (!editName.trim()) return;
    setError(null);
    try {
      await updateUser.mutateAsync({ id: u._id, payload: { name: editName.trim() } });
      cancelEdit();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update user"));
    }
  };

  const handleToggleActive = async (u: AdminUser) => {
    setError(null);
    try {
      await updateUser.mutateAsync({ id: u._id, payload: { isActive: !u.isActive } });
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update user"));
    }
  };

  const handleDelete = async (u: AdminUser) => {
    if (!confirm(`Delete user "${u.name}"? This cannot be undone.`)) return;
    setError(null);
    try {
      await deleteUser.mutateAsync(u._id);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to delete user"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#492a30]">Customers</h1>
          {meta && <p className="mt-0.5 text-sm text-[#987b7e]">{meta.total} total</p>}
        </div>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#b77b83]" />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="h-10 w-full rounded-xl border border-[#ead8d7] bg-white pl-9 pr-3 text-sm text-[#492a30] placeholder:text-[#c2aaab] outline-none focus:border-[#c66f7d]"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#B95770]" /></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#f4dedb] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#f4dedb] bg-[#fff8f6]">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Email</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Role</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#987b7e]">Joined</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4dedb]">
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <Users className="mx-auto mb-2 size-8 text-[#c2aaab]" />
                      <p className="text-sm text-[#987b7e]">No users found.</p>
                    </td>
                  </tr>
                )}
                {users.map((u) => (
                  <tr key={u._id} className="transition hover:bg-[#fff8f6]">
                    <td className="px-4 py-3">
                      {editId === u._id ? (
                        <div className="flex items-center gap-1">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 rounded-lg border border-[#ead8d7] px-2 text-sm text-[#492a30] outline-none focus:border-[#c66f7d]"
                            autoFocus
                          />
                          <button onClick={() => saveEdit(u)} className="rounded-lg p-1 text-green-600 hover:bg-green-50"><Check className="size-4" /></button>
                          <button onClick={cancelEdit} className="rounded-lg p-1 text-[#987b7e] hover:bg-[#fff5f3]"><X className="size-4" /></button>
                        </div>
                      ) : (
                        <span className="font-medium text-[#492a30]">{u.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#65454b]">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${u.role === "admin" ? "bg-[#fce8e6] text-[#a84759]" : "bg-[#e0e7ff] text-[#3730a3]"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(u)}
                        disabled={updateUser.isPending}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition ${u.isActive ? "bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0]" : "bg-[#fee2e2] text-[#991b1b] hover:bg-[#fecaca]"}`}
                      >
                        {u.isActive ? "Active" : "Suspended"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#987b7e]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(u)}
                          className="rounded-lg border border-[#ead8d7] p-1.5 text-[#65454b] hover:bg-[#fff5f3] hover:text-[#a84759]"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          disabled={deleteUser.isPending}
                          className="rounded-lg border border-[#ead8d7] p-1.5 text-[#65454b] hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
