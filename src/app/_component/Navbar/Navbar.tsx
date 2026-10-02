"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  ChevronDown,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Settings,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import logo from "../../../assets/images/freshcart-logo.svg";

const categories = [
  { name: "All Categories", href: "/categories" },
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Women Fashion", href: "/categories/women-fashion" },
  { name: "Men Fashion", href: "/categories/men-fashion" },
  { name: "Beauty & Health", href: "/categories/beauty-health" },
];

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

  const cartCount = cart?.numOfCartItems ?? 0;
  const wishlistCount = wishlist?.data?.length ?? 0;

  function handleLogout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-100">
      <NavigationMenu className="container mx-auto max-w-full bg-gray-100 p-3">
        <NavigationMenuList className="w-full justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src={logo} alt="FreshMart" priority />

            {session?.user?.name && (
              <div className="hidden items-center gap-3 lg:flex">
                <span className="rounded-md bg-purple-100 px-3 py-1 text-sm font-semibold text-blue-900">
                  Welcome, {session.user.name}
                </span>

                <span className="text-sm font-medium text-gray-600">
                  Shop the Best Products & Brands
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 md:flex">
            <NavigationMenuItem>
              <Link
                href="/"
                className="font-semibold transition hover:text-green-800"
              >
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/shop"
                className="font-semibold transition hover:text-green-800"
              >
                Shop
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/brands"
                className="font-semibold transition hover:text-green-800"
              >
                Brands
              </Link>
            </NavigationMenuItem>

            {/* Categories */}
            <NavigationMenuItem className="relative">
              <button
                type="button"
                onClick={function () {
                  setCategoryOpen(!categoryOpen);
                }}
                className="flex items-center gap-1 font-semibold transition hover:text-green-800"
              >
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <CategoryMenu
                  onClose={function () {
                    setCategoryOpen(false);
                  }}
                />
              )}
            </NavigationMenuItem>
              <NavigationMenuItem>
              <Link
                href="/about"
                className="font-semibold transition hover:text-green-800"
              >
                About
              </Link>
            </NavigationMenuItem>          
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-6 md:flex">
            {status === "authenticated" ? (
              <>
                <ActionLink
                  href="/cart"
                  label="Cart"
                  icon={<ShoppingBag className="h-6 w-6" />}
                  count={cartCount}
                />

                <ActionLink
                  href="/wishlist"
                  label="Wishlist"
                  icon={<Heart className="h-6 w-6" />}
                  count={wishlistCount}
                  countColor="red"
                />

                <ProfileMenu
                  name={session.user?.name}
                  email={session.user?.email}
                  open={profileOpen}
                  setOpen={setProfileOpen}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu */}
          <NavigationMenuItem className="md:hidden">
            <NavigationMenuTrigger aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="w-72 p-2">
                <ListItem href="/" title="Home" />
                <ListItem href="/shop" title="Shop" />
                <ListItem href="/brands" title="Brands" />
                <ListItem href="/categories" title="Categories" />

                <li className="my-2 border-t border-gray-200" />

                {status === "authenticated" ? (
                  <>
                    <MobileLink
                      href="/cart"
                      title="Cart"
                      icon={<ShoppingBag className="h-5 w-5" />}
                      count={cartCount}
                    />

                    <MobileLink
                      href="/wishlist"
                      title="Wishlist"
                      icon={<Heart className="h-5 w-5" />}
                      count={wishlistCount}
                      countColor="red"
                    />

                    <MobileLink
                      href="/updateProfile"
                      title="My Profile"
                      icon={<UserRound className="h-5 w-5" />}
                    />

                    <MobileLink
                      href="/allorders"
                      title="My Orders"
                      icon={<ShoppingBag className="h-5 w-5" />}
                    />

                    <MobileLink
                      href="/address"
                      title="My Address"
                      icon={<MapPin className="h-5 w-5" />}
                    />

                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <MobileLink
                      href="/login"
                      title="Sign In"
                      icon={<UserRound className="h-5 w-5" />}
                    />

                    <MobileLink
                      href="/register"
                      title="Sign Up"
                      icon={<UserRound className="h-5 w-5" />}
                    />
                  </>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

/* =========================
   Authentication Buttons
========================= */

function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-md border border-green-600 px-4 py-2 font-medium text-green-600 transition hover:bg-green-600 hover:text-white"
      >
        Sign In
      </Link>

      <Link
        href="/register"
        className="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
      >
        Sign Up
      </Link>
    </div>
  );
}

/* =========================
   Action Link
========================= */

function ActionLink({
  href,
  label,
  icon,
  count,
  countColor = "green",
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  count: number;
  countColor?: "green" | "red";
}) {
  return (
    <Link href={href} aria-label={label} className="relative flex items-center">
      {icon}

      {count > 0 && <CountBadge count={count} color={countColor} />}
    </Link>
  );
}

/* =========================
   Count Badge
========================= */

function CountBadge({
  count,
  color = "green",
}: {
  count: number;
  color?: "green" | "red";
}) {
  return (
    <span
      className={`absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-white ${
        color === "red" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {count}
    </span>
  );
}

/* =========================
   Category Menu
========================= */

function CategoryMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-3 w-56 rounded-lg border bg-white p-2 shadow-lg">
      {categories.map(function (category) {
        return (
          <Link
            key={category.name}
            href={category.href}
            onClick={onClose}
            className="block rounded-md px-4 py-2 text-sm font-medium transition hover:bg-green-50 hover:text-green-700"
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}

/* =========================
   Profile Menu
========================= */

function ProfileMenu({
  name,
  email,
  open,
  setOpen,
  onLogout,
}: {
  name?: string | null;
  email?: string | null;
  open: boolean;
  setOpen: (value: boolean) => void;
  onLogout: () => void;
}) {
  function closeMenu() {
    setOpen(false);
  }

  const addressUrl = `/address?name=${encodeURIComponent(
    name ?? "",
  )}&email=${encodeURIComponent(email ?? "")}`;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={function () {
          setOpen(!open);
        }}
        aria-label="Profile menu"
        className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-200"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600">
          <UserRound className="h-5 w-5" />
        </div>

        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
          {/* Profile Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
              <UserRound className="h-6 w-6" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">{name || "User"}</p>

              <p className="text-xs text-gray-400">My Account</p>
            </div>
          </div>

          {/* Profile Links */}
          <div className="py-2">
            <ProfileLink
              href="/updateProfile"
              title="My Profile"
              icon={<UserRound className="h-5 w-5" />}
              onClick={closeMenu}
            />

            <ProfileLink
              href="/allorders"
              title="My Orders"
              icon={<ShoppingBag className="h-5 w-5" />}
              onClick={closeMenu}
            />

            <ProfileLink
              href="/wishlist"
              title="My Wishlist"
              icon={<Heart className="h-5 w-5" />}
              onClick={closeMenu}
            />

            <ProfileLink
              href="/changePassword"
              title="Change Password"
              icon={<Settings className="h-5 w-5" />}
              onClick={closeMenu}
            />

            <ProfileLink
              href={addressUrl}
              title="My Address"
              icon={<MapPin className="h-5 w-5" />}
              onClick={closeMenu}
            />
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 p-2">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-sm text-red-500 transition hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   Profile Link
========================= */

function ProfileLink({
  href,
  title,
  icon,
  onClick,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 px-5 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-green-600"
    >
      {icon}
      {title}
    </Link>
  );
}

/* =========================
   Mobile Link
========================= */

function MobileLink({
  href,
  title,
  icon,
  count = 0,
  countColor = "green",
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  count?: number;
  countColor?: "green" | "red";
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium transition hover:bg-green-50 hover:text-green-700"
      >
        <span className="flex items-center gap-3">
          {icon}
          {title}
        </span>

        {count > 0 && <CountBadge count={count} color={countColor} />}
      </Link>
    </li>
  );
}

/* =========================
   List Item
========================= */

function ListItem({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink>
        <Link
          href={href}
          className="block rounded-md px-4 py-2 text-sm font-medium transition hover:bg-green-50 hover:text-green-700"
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
