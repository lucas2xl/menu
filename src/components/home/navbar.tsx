"use client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { NavHeader } from "./nav-header";

export function Navbar() {
  const [state, setState] = useState(false);

  return (
    <header className="relative">
      <div className="md:hidden">
        <NavHeader state={state} onClick={() => setState(!state)} />
      </div>
      <nav
        className={cn(
          "pb-5 md:text-sm md:static md:block",
          state
            ? "bg-gray-900 absolute z-20 top-0 inset-x-0 rounded-b-2xl shadow-xl md:bg-gray-900"
            : "hidden"
        )}
      >
        <div className="items-center md:flex">
          <NavHeader state={state} onClick={() => setState(!state)} />
          <div
            className={cn(
              "flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex",
              state ? "block" : "hidden"
            )}
          >
            <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="hover:text-gray-50">
                    <Link href={item.href} className="block">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              <Link
                href="/login"
                className={buttonVariants({
                  size: "icon",
                  variant: "link",
                  className: "text-white",
                })}
              >
                Sign in
              </Link>

              <Link
                href="/pricing"
                className={buttonVariants({
                  className:
                    "custom-btn-bg border border-gray-500 active:bg-gray-900 w-full",
                })}
              >
                Start now
                <ChevronRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
