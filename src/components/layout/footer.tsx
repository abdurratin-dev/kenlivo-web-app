"use client";

import { ArrowRight, Sprout, Music2 } from "lucide-react";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const quickLinks = [
  "Home",
  "About Us",
  "Contact",
  "FAQ",
  "Shipping Policy",
  "Return Policy",
];

const customerLinks = ["My Account", "Track Order", "Wishlist", "Help Center"];

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-[#292525] text-[#e9e1e1]">
      <div className="mx-auto max-w-screen-2xl px-6 py-10 md:px-10">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.9fr_1.3fr] lg:gap-8">
          {/* Brand */}
          <div className="lg:pr-5">
            <a href="/" className="inline-flex items-center gap-2">
              <Sprout size={35} strokeWidth={1.8} />
              <div>
                <h2 className="font-serif text-3xl tracking-wide">Kenlivo</h2>
                <p className="text-[11px] tracking-wide text-[#c9bebe]">
                  Beauty Meets Lifestyle
                </p>
              </div>
            </a>
          </div>

          {/* Quick Links */}
          <div className="border-l border-white/10 pl-6 lg:pl-8">
            <h3 className="mb-5 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={
                      link === "Home"
                        ? "/"
                        : `/${link.toLowerCase().replaceAll(" ", "-")}`
                    }
                    className="text-sm text-[#c9bebe] transition hover:text-pink-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="border-l border-white/10 pl-6 lg:pl-8">
            <h3 className="mb-5 text-sm font-semibold">Customer Care</h3>
            <ul className="space-y-3">
              {customerLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replaceAll(" ", "-")}`}
                    className="text-sm text-[#c9bebe] transition hover:text-pink-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div className="border-l border-white/10 pl-6 lg:pl-8">
            <h3 className="mb-5 text-sm font-semibold">Stay Connected</h3>

            <div className="mb-7 flex items-center gap-5">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="transition hover:text-pink-400"
              >
                <FaFacebook size={19} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="transition hover:text-pink-400"
              >
                <BsInstagram size={19} />
              </a>
              <a
                href="https://tiktok.com"
                aria-label="TikTok"
                className="transition hover:text-pink-400"
              >
                <Music2 size={19} />
              </a>
            </div>

            <h4 className="mb-1 text-sm font-semibold">
              Subscribe to our newsletter
            </h4>
            <p className="mb-4 text-xs leading-5 text-[#c9bebe]">
              Get the latest updates, offers and more.
            </p>

            <form
              action="/api/newsletter"
              method="POST"
              className="flex h-10 overflow-hidden rounded-lg bg-[#aaa0a3]"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/80"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex w-11 shrink-0 items-center justify-center bg-[#f17d9b] text-[#292525] transition hover:bg-[#ff9db4]"
              >
                <ArrowRight size={19} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-5 px-6 py-5 sm:flex-row md:px-10">
          <p className="text-xs text-[#c9bebe]">
            © {date} Kenlivo. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
    </footer>
  );
}
