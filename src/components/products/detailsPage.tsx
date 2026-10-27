"use client";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { EditButton } from "../cards/productsEditButtonCard";
import DeleteButton from "../cards/productsDeleteButtonCard";
import { use, useState } from "react";
import { ProductType } from "@/types/AllDataType";
import Image from "next/image";
import OrderSummaryCard from "../cards/orderSummaryCard";

const shades = [
  { name: "Bombshell", color: "#ed9b8c" },
  { name: "Famous", color: "#a94043" },
  { name: "Icon", color: "#b4415c" },
  { name: "Interview", color: "#d96383" },
  { name: "Wedding Day", color: "#d9c1bb" },
];

const tabs = ["Description", "Reviews"];

export default function DetailsPage({
  productData,
}: {
  productData: ProductType;
}) {
  console.log(productData);
  const [customerData, setCustomerData] = useState({});
  const [selectedShade, setSelectedShade] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [order, setOrder] = useState(false);
  const gallery = [
    { label: "Product", icon: "💄" },
    { label: "Lipstick", icon: "💋" },
    { label: "Texture", icon: "🎨" },
    { label: "Swatches", icon: "✨" },
  ];
  const tabContent: Record<string, string> = {
    Description: productData?.description,
  };
  if (order) {
    return (
      <>
        <div className="w-full">
          <OrderSummaryCard
            productData={productData}
          />
        </div>
      </>
    );
  }
  return (
    <main className="min-h-screen text-[#292323]">
      <div className="h-30"></div>
      <div className="mx-auto max-w-screen-2xl px-4 py-5 sm:px-7 lg:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center py-4 justify-between">
          <nav className="flex flex-wrap items-center gap-2  text-xs text-gray-500">
            <Link href="/" className="transition hover:text-[#bc536d]">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link
              href={`/${productData?.category}`}
              className="transition hover:text-[#bc536d]"
            >
              {productData?.category}
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#a64b60]">{productData?.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <EditButton product={productData || {}} />
            <DeleteButton product={productData || {}} />
          </div>
        </div>

        {/* Product section */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product gallery */}
          <div>
            <div className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 sm:grid-cols-[62px_minmax(0,1fr)]">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2">
                {gallery.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View ${item.label}`}
                    className={`flex aspect-square items-center justify-center rounded-md border bg-[#fff4f0] text-2xl transition ${
                      activeImage === index
                        ? "border-[#c65c75] ring-1 ring-[#c65c75]/20"
                        : "border-[#f1e4df] hover:border-[#d99aa8]"
                    }`}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>

              {/* Main image area */}
              <div className="relative flex aspect-[1.05/1] min-h-[280px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#fff7f4] via-[#fdf0ec] to-[#f8e5df] sm:min-h-[380px]">
                <Image
                  src={
                    productData?.imageUrl ||
                    "https://static.thenounproject.com/png/5191452-200.png"
                  }
                  width={500}
                  height={500}
                  alt={productData?.name || "products"}
                />

                <button
                  onClick={() => setFavorite(!favorite)}
                  aria-label="Add to wishlist"
                  className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 shadow-sm transition hover:scale-105"
                >
                  <Heart
                    size={19}
                    className={
                      favorite ? "fill-rose-500 text-rose-500" : "text-gray-600"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Gallery indicators */}
            <div className="mt-4 flex justify-center gap-2 lg:justify-start lg:pl-[75px]">
              {gallery.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Select ${item.label}`}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImage === index
                      ? "w-8 bg-[#bf5a73]"
                      : "w-2 bg-[#e9d6d1]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b66b75]">
              {productData?.category}
            </p>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
              {productData?.name}
            </h1>

            {/* Ratings */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-500">4.9</span>
              <span className="mx-1 text-gray-300">|</span>
              {/* <button
                onClick={() => setActiveTab("Reviews (523)")}
                className="text-gray-500 underline-offset-2 hover:underline"
              >
                523 reviews
              </button> */}
            </div>

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold text-[#bd526d]">
                ৳ {productData?.price}
              </span>
              {/* <span className="text-sm text-gray-400 line-through">
                ৳ 1,750
              </span> */}
              {/* <span className="rounded-sm bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white">
                23% OFF
              </span> */}
            </div>

            <p className="mt-4 max-w-lg text-sm leading-6 text-gray-500">
              {productData?.producttagline}
            </p>

            {/* Shade selector */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Color:</span>
                {/* <span className="text-gray-500">
                  {shades[selectedShade].name}
                </span> */}
              </div>

              {/* <div className="mt-3 flex flex-wrap gap-3">
                {shades.map((shade, index) => (
                  <button
                    key={shade.name}
                    onClick={() => setSelectedShade(index)}
                    title={shade.name}
                    aria-label={`Select shade ${shade.name}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                      selectedShade === index
                        ? "ring-2 ring-[#bf5a73] ring-offset-2"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: shade.color }}
                  >
                    {selectedShade === index && (
                      <Check
                        size={15}
                        className={
                          index === 4 ? "text-gray-700" : "text-white"
                        }
                      />
                    )}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">Quantity</label>
              <div className="flex h-10 w-28 items-center justify-between rounded-md border border-[#eadeda] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 text-gray-500 hover:text-[#bd526d]"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  aria-label="Increase quantity"
                  className="px-3 text-gray-500 hover:text-[#bd526d]"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Purchase buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => setAdded(true)}
                className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#c75d78] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b64b68] active:scale-[0.99]"
              >
                <ShoppingBag size={17} />
                {added ? "Added to Cart ✓" : "Add To Cart"}
              </button>

              <button
                onClick={() => {
                  alert(
                    `Checkout: ${quantity} × Huda Beauty Matte Lipstick (${shades[selectedShade].name})`,
                  );
                  setOrder(true);
                }}
                className="h-12 rounded-md bg-[#c69a52] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b48842] active:scale-[0.99]"
              >
                Buy Now
              </button>
            </div>

            {added && (
              <p className="mt-3 text-xs text-emerald-700">
                {quantity} item(s) added to your cart.
              </p>
            )}

            {/* Service benefits */}
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#f0e6e2] pt-5">
              <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
                <ShieldCheck size={20} className="shrink-0 text-[#a68b60]" />
                <span className="text-[10px] leading-4 text-gray-500 sm:text-xs">
                  100% Authentic
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
                <Truck size={20} className="shrink-0 text-[#a68b60]" />
                <span className="text-[10px] leading-4 text-gray-500 sm:text-xs">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
                <RotateCcw size={20} className="shrink-0 text-[#a68b60]" />
              </div>
            </div>
          </div>
        </section>

        {/* Product details tabs */}
        <section className="mt-10 border-t border-[#eadeda] pt-5 sm:mt-14">
          <div className="flex gap-5 overflow-x-auto border-b border-[#eee4e0] sm:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 border-b-2 px-1 pb-3 text-xs transition sm:text-sm ${
                  activeTab === tab
                    ? "border-[#c75d78] font-semibold text-[#bd526d]"
                    : "border-transparent text-gray-500 hover:text-[#bd526d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-3xl py-5">
            <h2 className="mb-2 text-sm font-semibold">{activeTab}</h2>
            <p className="text-sm leading-7 text-gray-500">
              {tabContent[activeTab]}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
