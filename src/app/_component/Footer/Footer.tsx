import Image from "next/image";
import logo from "../../../assets/images/freshcart-logo.svg";
import Link from "next/link";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: "All Products", href: "/" },
      { label: "Category", href: "categories" },
      { label: "Brands", href: "brands" },
      { label: "Electronics", href: "#trending" },
      { label: "Men's Fashion", href: "#trending" },
      { label: "Woman's Fashion", href: "#trending" },
    ],
    Account: [
      { label: "My Account", href: "#about" },
      { label: "Order History", href: "#careers" },
      { label: "Wishlist", href: "#press" },
      { label: "Shopping Cart", href: "#contact" },
      { label: "Sign In", href: "login" },
      { label: "Create Account", href: "register" },
    ],
    Support: [
      { label: "Contact Us", href: "#about" },
      { label: "Help Center", href: "#careers" },
      { label: "Shipping Info", href: "#press" },
      { label: "Returns & Refunds", href: "#contact" },
      { label: "Track Order", href: "#contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#help" },
      { label: "Terms of Service", href: "#safety" },
      { label: "Cookie Policy", href: "#rules" },
    ],
  };

  const socialIcons = [
    {
      href: "https://www.instagram.com/",
      label: "Instagram",
      path: (
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.63a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25Z" />
      ),
    },
    {
      href: "https://x.com/",
      label: "Twitter / X",
      path: (
        <path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.938l-5.43-7.09L4.16 22H.9l8.02-9.17L1.5 2h7.11l4.91 6.49L18.244 2Zm-1.217 18h1.833L7.06 3.9H5.1L17.027 20Z" />
      ),
    },
    {
      href: "https://www.facebook.com/",
      label: "Facebook",
      path: (
        <path d="M13.5 22v-8h2.7l.4-3.13h-3.1V8.86c0-.91.25-1.53 1.56-1.53h1.66V4.53C15.9 4.4 15 4.32 13.98 4.32c-2.53 0-4.26 1.54-4.26 4.37v2.18H7v3.13h2.72v8h3.78Z" />
      ),
    },
    {
      href: "https://www.youtube.com/",
      label: "YouTube",
      path: (
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 text-lg ">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-25">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="w-fit rounded-lg bg-white p-3">
              <Image src={logo} alt="FreshMart" priority />
            </div>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Information */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Phone */}
              <div className="flex cursor-pointer items-center gap-4 transition-colors hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 shrink-0 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span>+1 (800) 123-4567</span>
              </div>

              {/* Email */}
              <div className="flex cursor-pointer items-center gap-4 transition-colors hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 shrink-0 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <span>support@freshcart.com</span>
              </div>

              {/* Location */}
              <div className="flex cursor-pointer items-center gap-4 transition-colors hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 shrink-0 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 10.5-7.5 10.5S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <span>123 Market Street, New York, NY</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {socialIcons.map(({ path, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    {path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {category}
              </h3>

              <ul className="mt-4 space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors hover:text-green-600"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Copyright Border */}
      <div className="w-full border-t border-gray-700 ">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-base font-medium text-gray-400 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {currentYear} FreshCart. All rights reserved.</p>

          <div className="flex  items-center gap-4 text-base font-medium text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>

            <a
              href="#privacy"
              className="transition-colors hover:text-green-600"
            >
              Visa
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>

            <a href="#terms" className="transition-colors hover:text-green-600">
              Mastercard
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>

            <a
              href="#cookies"
              className="transition-colors hover:text-green-600"
            >
              PayPal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
