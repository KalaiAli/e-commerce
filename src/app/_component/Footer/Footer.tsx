"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "../../../assets/images/freshcart-logo.svg";

type FooterProps = {
  categoryIds: {
    electronics?: string;
    mensFashion?: string;
    womensFashion?: string;
  };
};

export default function Footer({ categoryIds }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: "All Products", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      {
        label: "Electronics",
        href: categoryIds.electronics
          ? `/subCategories/${categoryIds.electronics}`
          : "/categories",
      },
      {
        label: "Men's Fashion",
        href: categoryIds.mensFashion
          ? `/subCategories/${categoryIds.mensFashion}`
          : "/categories",
      },
      {
        label: "Women's Fashion",
        href: categoryIds.womensFashion
          ? `/subCategories/${categoryIds.womensFashion}`
          : "/categories",
      },
    ],

    Account: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],

    Support: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],

    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialIcons = [
    {
      href: "https://www.instagram.com/",
      label: "Instagram",
      path: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.63a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25Z",
    },
    {
      href: "https://x.com/",
      label: "Twitter / X",
      path: "M18.244 2H21.5l-7.5 8.57L22.75 22h-6.938l-5.43-7.09L4.16 22H.9l8.02-9.17L1.5 2h7.11l4.91 6.49L18.244 2Zm-1.217 18h1.833L7.06 3.9H5.1L17.027 20Z",
    },
    {
      href: "https://www.facebook.com/",
      label: "Facebook",
      path: "M13.5 22v-8h2.7l.4-3.13h-3.1V8.86c0-.91.25-1.53 1.56-1.53h1.66V4.53C15.9 4.4 15 4.32 13.98 4.32c-2.53 0-4.26 1.54-4.26 4.37v2.18H7v3.13h2.72v8h3.78Z",
    },
    {
      href: "https://www.youtube.com/",
      label: "YouTube",
      path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58ZM9.75 15.5v-7l6 3.5-6 3.5Z",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
          {/* Brand Section */}
          <div className="lg:w-[38%]">
            {/* Logo */}
            <div className="w-fit rounded-lg bg-white p-3">
              <Image
                src={logo}
                alt="FreshCart"
                priority
                className="h-auto w-auto"
              />
            </div>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Information */}
            <div className="mt-6 space-y-4">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.23a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
                  />
                </svg>

                <span className="text-md cursor-pointer hover:text-green-600">+1 (800) 123-4567</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7l9 6 9-6"
                  />
                  <rect width="18" height="14" x="3" y="5" rx="2" />
                </svg>

                <span className="text-md cursor-pointer hover:text-green-600">support@freshcart.com</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>

                <span className="text-md">
                  123 Market Street, New York, NY
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 transition-colors hover:border-green-600 hover:text-green-600"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-white">{category}</h3>

                <ul className="mt-4 space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-base transition-colors hover:text-green-600"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-gray-700">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-base font-medium sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {currentYear} FreshCart. All rights reserved.</p>

          {/* Payment Methods */}
          <div className="flex items-center gap-4 text-base font-medium">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
