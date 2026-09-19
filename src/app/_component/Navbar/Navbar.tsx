"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@base-ui/react/button";

import logo from "../../../assets/images/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];
//  middle ware  beyween client and server any request pass thru middleware
//  old version : middleware , new Version  : proxy
function handleLogout() {
  signOut({
    redirect: true,
    callbackUrl: "/login",
  });
}
export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // console.log("session:", session?.user.name);
  // console.log("status:", status);
  return (
    <div className="container mx-auto flex justify-between sticky top-0 z-50 bg-gray-100">
      <NavigationMenu className="bg-gray-100  max-w-full p-3">
        <NavigationMenuList className="justify-between">
<div className="flex items-center gap-3">
  <Image src={logo} alt="FreshMart" priority />

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
          <div className="md:flex gap-4  hidden">
            <NavigationMenuItem>
              <Link className="font-semibold hover:text-green-800" href="/">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link className="font-semibold hover:text-green-800" href="/shop">
                Shop
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className="font-semibold hover:text-green-800"
                href="/brands"
              >
                Brands
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className="font-semibold hover:text-green-800"
                href="/categories"
              >
                Categories
              </Link>
            </NavigationMenuItem>
          </div>

          <div className="md:flex gap-4 items-center hidden">
            {/* cart */}
            {status === "authenticated" ? (
              <>
                <Link href="/cart">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 0Z"
                    />
                  </svg>
                </Link>

                <Link href="/wishList">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </Link>

                <Button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-md bg-green-600 px-3 py-2 text-white"
                >
                  LogOut
                </Button>
              </>
            ) : (
              <Button className="cursor-pointer rounded-md bg-green-600 px-3 py-2 text-white">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>

          <NavigationMenuItem className=" md:hidden">
            <NavigationMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/" title="Home">
                  <Link href="/"></Link>
                </ListItem>
                <ListItem href="/brands" title="Brands">
                  <Link href="/brands"></Link>
                </ListItem>
                <ListItem href="/shop" title="Shop">
                  <Link href="/shop"></Link>
                </ListItem>
                <ListItem href="/categories" title="Categories">
                  <Link href="/categories"></Link>
                </ListItem>
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
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
