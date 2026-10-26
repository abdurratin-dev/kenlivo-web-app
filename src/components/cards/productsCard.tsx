"use client";

import { ProductType } from "@/types/AllDataType";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

export default function ProductCard({ product }: { product: ProductType }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div className="group relative w-full max-w-[300px] overflow-hidden rounded-3xl border border-rose-100/80 bg-white shadow-[0_8px_30px_rgba(185,87,112,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-rose-200 hover:shadow-[0_20px_45px_rgba(185,87,112,0.15)]">
      {/* Product Image */}
      <div className="relative m-2.5 flex h-64 items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 p-6">
        {/* Decorative background */}
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/60 blur-2xl transition-transform duration-700 group-hover:scale-150" />

        {/* Badge */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B95770] shadow-sm backdrop-blur-md">
          Best Seller
        </span>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:text-[#B95770] active:scale-95"
          >
          {isFavorite ? (
            <FaHeart className="text-[#B95770]" size={16} />
          ) : (
            <FaRegHeart size={17} />
          )}
        </button>

        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="relative z-[1] h-full w-full object-contain drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-110"
          />

        {/* Quick action */}
        <button
          type="button"
          onClick={() => setAdded((prev) => !prev)}
          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#B95770] opacity-0 shadow-md transition-all duration-300 hover:bg-[#B95770] hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
          aria-label="Quick add to cart"
          >
          <FaShoppingCart size={15} />
        </button>
      </div>

      {/* Product Details */}
      <div className="px-4 pb-4 pt-2">
        <Link href={`products/${product._id}`}>
          {/* Category */}
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B95770]">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-gray-800 transition-colors duration-300 group-hover:text-[#B95770]">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
            {product.producttagline}
          </p>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              ৳{product.price}
            </span>

            {/* {product.oldPrice != null && (
            <>
            <span className="text-sm text-gray-400 line-through">
            ৳{product.oldPrice}
            </span>
            
            <span className="rounded-md bg-rose-50 px-1.5 py-1 text-[10px] font-bold text-[#B95770]">
            SALE
            </span>
            </>
          )} */}
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} size={12} />
              ))}
            </div>

            <span className="text-xs font-semibold text-gray-700">
              {/* {product.rating ?? "4.8"} */}
            </span>

            {/* <span className="text-xs text-gray-400">
            ({product.reviewCount ?? 146} reviews)
            </span> */}
          </div>

          {/* Add to Cart */}
        </Link>
        <button
          type="button"
          onClick={() => setAdded((prev) => !prev)}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 active:scale-[0.97] ${
            added
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
              : "bg-gradient-to-r from-[#B95770] to-[#D66B89] text-white shadow-md shadow-rose-100 hover:from-[#A84360] hover:to-[#C95778] hover:shadow-lg"
          }`}
        >
          <FaShoppingCart size={14} />
          <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>

          {!added && (
            <FaArrowRight
              size={12}
              className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
    </div>
  );
}
