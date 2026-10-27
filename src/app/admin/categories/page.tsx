"use client";

import { useState } from "react";
import Image from "next/image";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/useProducts";
import { Loader2, Plus, Pencil, Trash2, Tag, X, Check, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getApiErrorMessage } from "@/lib/api/axios";
import type { Category } from "@/lib/api/types";
import type { CategoryInput } from "@/lib/api/products";

const PAGE_SIZE = 12;
const emptyForm: CategoryInput = { name: "", description: "", image: "", isActive: true };

export default function AdminCategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useCategories({ page, limit: PAGE_SIZE, search: search || undefined });
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = data?.items ?? [];
  const meta = data?.meta;

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryInput>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description ?? "", image: cat.image ?? "", isActive: cat.isActive });
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); setFormError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const payload: CategoryInput = {
      name: form.name.trim(),
      description: form.description?.trim() || undefined,
      image: form.image?.trim() || undefined,
      isActive: form.isActive,
    };
    try {
      if (editing) {
        await updateCategory.mutateAsync({ id: editing._id, payload });
      } else {
        await createCategory.mutateAsync(payload);
      }
      closeForm();
    } catch (err) {
      setFormError(getApiErrorMessage(err, "Failed to save category"));
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Delete "${cat.name}"? This cannot be undone.`)) return;
    setPageError(null);
    try {
      await deleteCategory.mutateAsync(cat._id);
    } catch (err) {
      setPageError(getApiErrorMessage(err, "Failed to delete category"));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const isPending = createCategory.isPending || updateCategory.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-[#492a30]">Categories</h1>
          {meta && <p className="mt-0.5 text-sm text-[#987b7e]">{meta.total} total</p>}
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#c96778] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ad5064]"
        >
          <Plus className="size-4" /> Add Category
        </button>
      </div>

      {pageError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{pageError}</p>}

      {/* Search */}
      <form onSubmit={handleSearch} className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#b77b83]" />
        <input
          type="text"
          placeholder="Search categories…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-10 w-full rounded-xl border border-[#ead8d7] bg-white pl-9 pr-3 text-sm text-[#492a30] placeholder:text-[#c2aaab] outline-none focus:border-[#c66f7d]"
        />
      </form>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#f4dedb] px-5 py-4">
              <h2 className="font-heading text-lg font-semibold text-[#492a30]">
                {editing ? "Edit Category" : "New Category"}
              </h2>
              <button onClick={closeForm} className="rounded-lg p-1 text-[#987b7e] hover:bg-[#fff5f3]">
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#65454b]">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Face Wash"
                  className="h-10 w-full rounded-xl border border-[#ead8d7] bg-white px-3 text-sm text-[#492a30] placeholder:text-[#c2aaab] outline-none focus:border-[#c66f7d]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#65454b]">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short description…"
                  className="w-full resize-none rounded-xl border border-[#ead8d7] bg-white px-3 py-2 text-sm text-[#492a30] placeholder:text-[#c2aaab] outline-none focus:border-[#c66f7d]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#65454b]">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://…"
                  className="h-10 w-full rounded-xl border border-[#ead8d7] bg-white px-3 text-sm text-[#492a30] placeholder:text-[#c2aaab] outline-none focus:border-[#c66f7d]"
                />
                {form.image && (
                  <div className="mt-2 flex justify-center">
                    <div className="relative size-20 overflow-hidden rounded-full border-2 border-[#f4dedb] bg-[#fce8e6]">
                      <Image src={form.image} alt="preview" fill className="object-cover" />
                    </div>
                  </div>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-3">
                <div
                  onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                  className={`relative h-5 w-9 rounded-full transition-colors ${form.isActive ? "bg-[#c96778]" : "bg-[#e5cfd1]"}`}
                >
                  <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${form.isActive ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-[#65454b]">Active</span>
              </label>

              {formError && <p className="text-xs text-red-500">{formError}</p>}

              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={closeForm} className="rounded-xl border border-[#ead8d7] px-4 py-2 text-sm text-[#65454b] hover:bg-[#fff5f3]">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c96778] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ad5064] disabled:opacity-60"
                >
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                  {editing ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 rounded-2xl border border-[#f4dedb] bg-white p-4">
              <div className="size-20 animate-pulse rounded-full bg-[#fce8e6]" />
              <div className="h-3 w-24 animate-pulse rounded bg-[#f4dedb]" />
              <div className="h-2.5 w-16 animate-pulse rounded bg-[#f4dedb]" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#f4dedb] py-16 text-center">
                <Tag className="mb-3 size-10 text-[#c2aaab]" />
                <p className="text-sm text-[#987b7e]">
                  {search ? `No categories found for "${search}".` : "No categories yet. Add your first one."}
                </p>
              </div>
            )}
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[#f4dedb] bg-white p-4 shadow-sm"
              >
                <div className="relative size-20 overflow-hidden rounded-full border-2 border-[#f4dedb] bg-[linear-gradient(180deg,#FDEBE5_0%,#F8D2C8_100%)]">
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Tag className="size-7 text-[#c96778]" />
                    </div>
                  )}
                </div>

                <div className="w-full text-center">
                  <p className="font-medium text-[#492a30] leading-tight">{cat.name}</p>
                  {cat.description && (
                    <p className="mt-0.5 line-clamp-2 text-xs text-[#987b7e]">{cat.description}</p>
                  )}
                  <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.isActive ? "bg-[#d1fae5] text-[#065f46]" : "bg-[#fee2e2] text-[#991b1b]"}`}>
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(cat)}
                    className="rounded-lg border border-[#ead8d7] p-1.5 text-[#65454b] hover:bg-[#fff5f3] hover:text-[#a84759]"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    disabled={deleteCategory.isPending}
                    className="rounded-lg border border-[#ead8d7] p-1.5 text-[#65454b] hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between rounded-2xl border border-[#f4dedb] bg-white px-4 py-3">
              <p className="text-xs text-[#987b7e]">
                Page {meta.page} of {meta.totalPages} &middot; {meta.total} categories
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex size-8 items-center justify-center rounded-lg border border-[#ead8d7] text-[#65454b] hover:bg-[#fff5f3] disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>

                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && typeof arr[idx - 1] === "number" && (p as number) - (arr[idx - 1] as number) > 1) {
                      acc.push("…");
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "…" ? (
                      <span key={`ellipsis-${i}`} className="px-1 text-xs text-[#987b7e]">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={`flex size-8 items-center justify-center rounded-lg border text-xs font-medium transition-colors ${
                          page === p
                            ? "border-[#c96778] bg-[#c96778] text-white"
                            : "border-[#ead8d7] text-[#65454b] hover:bg-[#fff5f3]"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                  className="flex size-8 items-center justify-center rounded-lg border border-[#ead8d7] text-[#65454b] hover:bg-[#fff5f3] disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
