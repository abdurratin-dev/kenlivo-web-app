"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, LogIn, Search, ShoppingBag, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/makeup", label: "Makeup" },
  { href: "/skincare", label: "Skincare" },
  { href: "/haircare", label: "Haircare" },
  { href: "/brands", label: "Brands" },
  {href: "/offers",label: 'Offers'}
];

// Placeholder until bookings are wired up to a real store.
const bookingCount = 1;


export function Navbar() {
  const {data:sesion,error} = authClient.useSession();
  const user = sesion?.user
  const iconLinks = user ? [
  { href: "/profile", label: "Account", Icon: User },
  { href: "/destinations", label: "Saved destinations", Icon: Heart },
] : [
  { href: "/login", label: "Account", Icon: LogIn },
  { href: "/destinations", label: "Saved destinations", Icon: Heart },
]
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b bg-[#FFF9F2] transition-shadow duration-300 ${
        scrolled ? "border-border shadow-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
        <div className="flex h-16 items-center gap-3 md:h-20 md:gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Wanderlust home"
          >
            <span className="grid size-10 place-items-center rounded-full bg-[#B95770]/10 text-[#B95770] md:size-12">
              <Compass className="size-5 md:size-6" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-2xl font-bold md:text-3xl text-[#302526]">
                Kenlivo
              </span>
              <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-[#B95770] uppercase md:text-xs">
                Beauty Meets Lifestyle
              </span>
            </span>
          </Link>

          <form
            role="search"
            action="/products"
            className="relative mx-auto hidden h-11 w-full min-w-0 max-w-xl flex-1 items-center sm:flex md:h-12"
          >
            <Search
              className="pointer-events-none absolute left-4 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              aria-label="Search products"
              placeholder="Search products ..."
              className="h-full w-full rounded-full border border-[#B95770]/20 bg-[#B95770]/5 pr-14 pl-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[#B95770]/40 focus:bg-[#FFF9F2]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 grid h-8 w-10 place-items-center rounded-full bg-[#B95770] text-white transition-colors hover:bg-[#B95770]/90 md:h-9 md:w-11"
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0 md:gap-3">
            {iconLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-[#B95770]/10 hover:text-[#B95770]"
              >
                <Icon className="size-5" aria-hidden="true" />
              </Link>
            ))}
            <Link
              href="/orders"
              aria-label={`My bookings ( trip)`}
              className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-[#B95770]/10 hover:text-[#B95770]"
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-[#B95770] text-[10px] leading-none font-semibold text-white">
                
              </span>
            </Link>
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label="Main"
              inert={scrolled}
              className="flex h-11 items-center gap-6 overflow-x-auto md:justify-center md:gap-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`shrink-0 text-sm whitespace-nowrap transition-colors md:text-base ${
                      isActive
                        ? "font-semibold text-[#B95770] underline decoration-2 underline-offset-4"
                        : "font-medium text-foreground hover:text-[#B95770]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
