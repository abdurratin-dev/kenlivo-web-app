"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";

export default function AddTravelPackage() {
  const [formData, setFormData] = useState({
    products: "",
    category: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch(`${process.env.NEXT_PUBLIC_KENLIVO_DATA_API}products`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    console.log(result);
  };

  const handleCancel = () => {
    setFormData({
      products: "",
      category: "",
      price: "",
      imageUrl: "",
      description: "",
    });
  };

  const inputClass =
    "mt-1.5 w-full border border-gray-100 bg-[#f6f8fa] px-3 py-2 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#B95770] focus:bg-white rounded-md";

  const fields = [
    {
      name: "name",
      label: "Products Name",
      placeholder: "Products Name",
      full: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["Cream", "Face Wash", "Lotion", "Sunscreen", "Serum"],
    },
    {
      name: "price",
      label: "Price (TK)",
      placeholder: "e.g., 1299",
      type: "number",
    },
    {
      name: "producttagline",
      label : "Product Tagline",
      placeholder: "Product Tagline",
      full: true
    },
    {
      name: "imageUrl",
      label: "Image URL",
      placeholder: "https://example.com/image.jpg",
      type: "url",
      full: true,
    },
  ];

  return (
    <section className="min-h-screen px-5 py-10 sm:px-8">
      <div className="h-30"></div>
      <h1 className="font-serif text-3xl text-center font-normal tracking-tight text-[#171717] sm:text-[34px]">
        Add New Product
      </h1>

      <div className="mx-auto mt-12 w-full max-w-5xl border border-gray-100 bg-white px-5 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.12)] sm:mt-14 sm:px-6 sm:py-6 rounded-2xl">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.full ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={field.name}
                  className="block font-semibold text-[#222]"
                >
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder || ""}
                    min={field.type === "number" ? "0" : undefined}
                    step={field.type === "number" ? "0.01" : undefined}
                    className={inputClass}
                  />
                )}
              </div>
            ))}

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block font-semibold text-[#222]"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the travel experience..."
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-2.5">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-[36px] items-center justify-center gap-1.5 border border-[#ff6b6b] px-3.5 text-[11px] text-[#ff5252] transition hover:bg-red-50 rounded-md"
            >
              <Trash2 size={12} />
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-[36px] items-center justify-center gap-1.5 bg-[#B95770] px-4 text-[11px] text-white transition hover:bg-[#a1576a] rounded-md"
            >
              <Save size={12} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
