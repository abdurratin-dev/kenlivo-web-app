"use client";

import { useMemo, useState } from "react";
import { Save, Trash2, ShieldAlert, Loader2 } from "lucide-react";
import { useCurrentUser } from "@/hooks/useAuth";
import {
  useCategories,
  useCreateProduct,
  useDeleteProduct,
  useProducts,
} from "@/hooks/useProducts";
import { getApiErrorMessage } from "@/lib/api/axios";
import type { ProductInput } from "@/lib/api/products";

const inputClass =
  "mt-1.5 w-full border border-gray-100 bg-[#f6f8fa] px-3 py-2 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#B95770] focus:bg-white rounded-md";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  discountPercentage: "",
  stock: "",
  tagline: "",
  images: "",
  description: "",
};

export default function AdminPanel() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts({ limit: 50, sort: "-createdAt" });
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const products = productsData?.items ?? [];

  // Live preview of the pasted image links (Facebook/CDN URLs — no upload bucket).
  const imagePreviews = useMemo(
    () =>
      form.images
        .split(/[\n,]/)
        .map((u) => u.trim())
        .filter(Boolean),
    [form.images],
  );

  if (userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#B95770]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <ShieldAlert className="text-[#B95770]" size={40} />
        <h1 className="font-serif text-2xl text-[#171717]">Admin access required</h1>
        <p className="max-w-md text-sm text-gray-500">
          You must be signed in as an admin to manage products. Please log in with an
          administrator account.
        </p>
      </section>
    );
  }

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const payload: ProductInput = {
      name: form.name.trim(),
      description: form.description.trim(),
      tagline: form.tagline.trim() || undefined,
      price: Number(form.price),
      discountPercentage: form.discountPercentage ? Number(form.discountPercentage) : undefined,
      stock: form.stock ? Number(form.stock) : undefined,
      category: form.category,
      images: imagePreviews,
    };

    try {
      await createProduct.mutateAsync(payload);
      setFeedback({ type: "ok", text: `"${payload.name}" created successfully.` });
      setForm(emptyForm);
    } catch (err) {
      setFeedback({ type: "err", text: getApiErrorMessage(err, "Failed to create product") });
    }
  };

  return (
    <section className="min-h-screen px-5 py-10 sm:px-8">
      <div className="h-24" />
      <h1 className="text-center font-serif text-3xl font-normal tracking-tight text-[#171717] sm:text-[34px]">
        Admin · Product Management
      </h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Signed in as {user.name} ({user.email})
      </p>

      {/* Create product */}
      <div className="mx-auto mt-10 w-full max-w-5xl rounded-2xl border border-gray-100 bg-white px-5 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.12)] sm:px-6">
        <h2 className="mb-4 font-serif text-xl text-[#171717]">Add New Product</h2>

        {feedback && (
          <div
            className={`mb-4 rounded-md px-3 py-2 text-xs ${
              feedback.type === "ok"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#222]">Product Name</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Product name"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#222]">Category</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#222]">Price (TK)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className={inputClass}
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="e.g., 1299"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#222]">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className={inputClass}
              value={form.discountPercentage}
              onChange={(e) => update("discountPercentage", e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#222]">Stock</label>
            <input
              type="number"
              min="0"
              className={inputClass}
              value={form.stock}
              onChange={(e) => update("stock", e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#222]">Product Tagline</label>
            <input
              className={inputClass}
              value={form.tagline}
              onChange={(e) => update("tagline", e.target.value)}
              placeholder="Short tagline"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#222]">
              Image URLs <span className="font-normal text-gray-400">(one per line or comma-separated)</span>
            </label>
            <textarea
              rows={3}
              className={`${inputClass} resize-y`}
              value={form.images}
              onChange={(e) => update("images", e.target.value)}
              placeholder={"https://scontent.xx.fbcdn.net/....jpg\nhttps://..."}
            />
            {imagePreviews.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {imagePreviews.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt="preview"
                    className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#222]">Description</label>
            <textarea
              rows={5}
              className={`${inputClass} resize-y`}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the product..."
              required
            />
          </div>

          <div className="mt-2 flex flex-wrap justify-end gap-2.5 sm:col-span-2">
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="inline-flex h-[36px] items-center justify-center gap-1.5 rounded-md border border-[#ff6b6b] px-3.5 text-[11px] text-[#ff5252] transition hover:bg-red-50"
            >
              <Trash2 size={12} />
              Reset
            </button>
            <button
              type="submit"
              disabled={createProduct.isPending}
              className="inline-flex h-[36px] items-center justify-center gap-1.5 rounded-md bg-[#B95770] px-4 text-[11px] text-white transition hover:bg-[#a1576a] disabled:opacity-60"
            >
              {createProduct.isPending ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Existing products */}
      <div className="mx-auto mt-10 w-full max-w-5xl rounded-2xl border border-gray-100 bg-white px-5 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.12)] sm:px-6">
        <h2 className="mb-4 font-serif text-xl text-[#171717]">
          Products ({products.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-gray-400">
              <tr className="border-b border-gray-100">
                <th className="py-2 pr-3 font-medium">Name</th>
                <th className="py-2 pr-3 font-medium">Price</th>
                <th className="py-2 pr-3 font-medium">Stock</th>
                <th className="py-2 pr-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-gray-50 text-gray-700">
                  <td className="py-2 pr-3">{p.name}</td>
                  <td className="py-2 pr-3">{p.price} TK</td>
                  <td className="py-2 pr-3">{p.stock}</td>
                  <td className="py-2 pr-3 text-right">
                    <button
                      onClick={() => deleteProduct.mutate(p._id)}
                      disabled={deleteProduct.isPending}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-[11px] text-[#ff5252] transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={11} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-400">
                    No products yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
