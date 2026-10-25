import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
];

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const contactInfo = [
  { label: "786 901 1622", href: "tel:7869011622" },
  { label: "info@wandarland.com", href: "mailto:info@wandarland.com" },
];

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", Icon: XIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
];

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-semibold tracking-widest text-foreground uppercase">
      {children}
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-6 pt-16 pb-10 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <p className="font-heading text-5xl font-bold md:text-6xl">
              Wanderlast
            </p>
            <p className="mt-4 text-white/70">
              Your gateway to extraordinary travel experiences around the world.
            </p>
            <form className="mt-8 max-w-sm" action="#" aria-label="Newsletter">
              <ColumnHeading>Newsletter</ColumnHeading>
              <p className="mt-3 text-sm text-white/70">
                Subscribe for exclusive travel deals and inspiration.
              </p>
              <div className="relative mt-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  aria-label="Email address"
                  className="h-11 rounded-sm border-white/20 bg-white/10 pr-12 text-sm text-white placeholder:text-white/60 focus-visible:border-white/40 focus-visible:ring-white/30"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/80 transition-colors hover:text-white"
                >
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            <nav aria-labelledby="footer-quick-links">
              <ColumnHeading>
                <span id="footer-quick-links">Quick Links</span>
              </ColumnHeading>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-support">
              <ColumnHeading>
                <span id="footer-support">Support</span>
              </ColumnHeading>
              <ul className="mt-5 space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div aria-labelledby="footer-contact">
              <ColumnHeading>
                <span id="footer-contact">Contact Us</span>
              </ColumnHeading>
              <ul className="mt-5 space-y-3">
                {contactInfo.map((contact) => (
                  <li key={contact.href}>
                    <a
                      href={contact.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {contact.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/60">
              © 2026 Wanderlust. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
