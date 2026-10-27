"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiShoppingBag,
  FiHeart,
  FiHeadphones,
} from "react-icons/fi";

const stats = [
  {
    icon: FiShoppingBag,
    value: "50K+",
    label: "Happy Customers",
  },
  {
    icon: FiHeart,
    value: "500+",
    label: "Premium Brands",
  },
  {
    icon: FiHeadphones,
    value: "24/7",
    label: "Customer Support",
  },
];

export default function BeautyBanner() {
  return (
    <section>
      <div className="grid overflow-hidden border border-rose-100 bg-[#fff7f4] shadow-sm md:grid-cols-[1.65fr_1fr] mx-auto container">
        {/* Promotional Banner */}
        <div className="relative flex min-h-[260px] items-center overflow-hidden bg-gradient-to-r from-[#fbe2dd] via-[#fff0eb] to-[#f9d9d2] px-6 py-8 sm:px-10 md:min-h-[280px]">
          {/* Decorative circles */}
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/30 blur-2xl" />

          {/* Text Content */}
          <div className="relative z-10 max-w-[250px] sm:max-w-[290px]">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
              Your Beauty, Your Way
            </span>

            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#a63250] sm:text-4xl">
              Real Beauty
              <br />
              Real You
            </h2>

            <p className="mt-3 max-w-[250px] text-sm leading-6 text-gray-600">
              Skincare for healthy, glowing skin.
              Because you deserve the best.
            </p>

            <Link
              href="/categories/skincare"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#b44460] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#96354e]"
            >
              Shop Skincare
              <FiArrowRight size={16} />
            </Link>
          </div>

          {/* Hero Image */}
          <div>
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/043/533/156/small/a-woman-with-a-flower-headband-and-a-pink-beauty-banner-background-photo.jpeg"
              alt="Skincare beauty collection"
              fill
              priority
              sizes="(max-width: 768px) 45vw, 25vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 items-center gap-0 bg-[#fffaf8] px-2 py-8 sm:px-5 md:px-3 lg:px-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex min-w-0 flex-col items-center justify-center px-1 text-center sm:px-2 ${
                  index !== 0 ? "border-l border-rose-200" : ""
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b58a76] text-[#946a58] transition-all duration-300 hover:bg-rose-100">
                  <Icon size={21} strokeWidth={1.5} />
                </div>

                <h3 className="mt-3 text-xl font-bold text-[#b44460] sm:text-2xl">
                  {stat.value}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
