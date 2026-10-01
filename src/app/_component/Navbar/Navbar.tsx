"use client";


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@base-ui/react/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


import {
  UserRound,
  Heart,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import logo from "../../../assets/images/freshcart-logo.svg";

const categories = [
  { name: "All Categories", href: "/categories" },
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Women Fashion", href: "/categories/women-fashion" },
  { name: "Men Fashion", href: "/categories/men-fashion" },
  { name: "Beauty & Health", href: "/categories/beauty-health" },
];

function handleLogout() {
  signOut({
    redirect: true,
    callbackUrl: "/login",
  });
}

export default function NavBar() {

  const [profileOpen, setProfileOpen] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const { data: session, status } = useSession();

  const { data: cart } = useQuery({
    queryKey: ["GetCart"],
    queryFn: async function () {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return response.json();
    },
    enabled: status === "authenticated",
  });

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async function () {
      const response = await fetch("/api/wishlist", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      return response.json();
    },
    enabled: status === "authenticated",
    refetchOnMount: "always",
  });

  return (
    <div className="sticky top-0 z-50 bg-gray-100">
      <NavigationMenu className="container mx-auto max-w-full bg-gray-100 p-3">
        <NavigationMenuList className="w-full justify-between">

          {/* Logo + Welcome */}
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="FreshMart"
              priority
            />

            {session?.user?.name && (
              <>
                <span className="rounded-md bg-purple-100 px-3 py-1 text-md font-semibold text-blue-900">
                  Welcome, {session.user.name}
                </span>

                <span className="text-sm font-medium text-gray-600">
                  Shop the Best Products & Brands
                </span>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">

            <NavigationMenuItem>
              <Link
                href="/"
                className="font-semibold hover:text-green-800"
              >
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/shop"
                className="font-semibold hover:text-green-800"
              >
                Shop
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/brands"
                className="font-semibold hover:text-green-800"
              >
                Brands
              </Link>
            </NavigationMenuItem>

            {/* Categories Dropdown */}
            <NavigationMenuItem className="relative">
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center gap-1 font-semibold hover:text-green-800"
              >
                Categories

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-56 rounded-lg border bg-white p-2 shadow-lg">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setCategoryOpen(false)}
                      className="block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </NavigationMenuItem>
          </div>

          {/* Cart / Wishlist / Auth */}
          <div className="hidden items-center gap-6 md:flex">
            {status === "authenticated" ? (
              <>
                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>

                  {cart?.numOfCartItems > 0 && (
                    <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-500 px-1 text-xs font-bold text-white">
                      {cart.numOfCartItems}
                    </span>
                  )}
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishList"
                  className="relative flex h-6 w-6 items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>

                  {wishlist?.data?.length > 0 && (
                    <span className="absolute -right-3 -top-3 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {wishlist.data.length}
                    </span>
                  )}
                </Link>

                {/* Logout */}
<div className="relative">
  <button
    type="button"
    onClick={() => setProfileOpen(!profileOpen)}
    className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600">
      <UserRound className="h-5 w-5" />
    </div>

    <ChevronDown
      className={`hidden h-4 w-4 text-gray-500 transition-transform sm:block ${
        profileOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
      
      {/* Profile Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
          <UserRound className="h-6 w-6" />
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {session?.user?.name}
          </p>

          <p className="text-xs text-gray-400">
            My Account
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="py-2">
        <Link
          href="/updateProfile"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-4 px-5 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-green-600"
        >
          <UserRound className="h-5 w-5 text-gray-400" />
          My Profile
        </Link>

        <Link
          href="/allorders"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-4 px-5 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-green-600"
        >
          <ShoppingBag className="h-5 w-5 text-gray-400" />
          My Orders
        </Link>

        <Link
          href="/wishList"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-4 px-5 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-green-600"
        >
          <Heart className="h-5 w-5 text-gray-400" />
          My Wishlist
        </Link>

        <Link
          href="/addresses"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-4 px-5 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-green-600"
        >
          <MapPin className="h-5 w-5 text-gray-400" />
          Addresses
        </Link>

        <Link
          href="/changePassword"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-4 bg-green-50 px-5 py-3 text-sm font-medium text-green-600"
        >
          <Settings className="h-5 w-5" />
            Change Password
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t border-gray-100 p-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-sm text-red-500 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )}
</div>
              </>
            ) : (
              <Button className="cursor-pointer rounded-md bg-green-600 px-3 py-2 text-white">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <NavigationMenuItem className="md:hidden">
            <NavigationMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/" title="Home" />
                <ListItem href="/shop" title="Shop" />
                <ListItem href="/brands" title="Brands" />
                <ListItem href="/categories" title="Categories" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink >
        <Link href={href}>
          <div className="rounded-md px-4 py-2 text-sm font-medium hover:bg-green-50 hover:text-green-700">
            {title}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}