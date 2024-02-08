import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, ClipboardIcon } from "lucide-react";

export function Hero() {
  return (
    <main className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('../components/images/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('../components/images/polygon-bg-element-dark.svg')]">
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <Link
            href="#"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "gap-x-2",
            })}
          >
            PRO release - Join to waitlist
            <span className="py-1.5 px-2.5 rounded-full bg-muted font-semibold text-sm text-muted-foreground">
              <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="block font-bold text-foreground text-4xl md:text-5xl lg:text-6xl">
            Let&rsquo;s Build{" "}
            <span className="bg-clip-text bg-gradient-to-tl from-primary to-pink-500 text-transparent">
              Together
            </span>
          </h1>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-muted-foreground">
            Preline UI is an open-source set of prebuilt UI components,
            ready-to-use examples and Figma design system based on the
            utility-first Tailwind CSS framework.
          </p>
        </div>

        <div className="mt-8 gap-3 flex justify-center">
          <Link
            href="/dashboard"
            className={buttonVariants({
              className:
                "group gap-x-4 bg-gradient-to-tl from-primary to-pink-500 hover:from-pink-500 hover:to-primary text-white",
            })}
          >
            Get started
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:scale-110 transition" />
          </Link>

          <Button
            variant="outline"
            className="group gap-x-4 text-muted-foreground"
          >
            $ npm i preline
            <span className="flex justify-center items-center bg-muted text-muted-foreground rounded-md w-7 h-7">
              <ClipboardIcon className="w-4 h-4 group-hover:rotate-6 transition" />
            </span>
          </Button>
        </div>

        <div className="mt-5 inline-flex justify-center items-center gap-x-1 sm:gap-x-2">
          <span className="text-sm text-muted-foreground">
            Package Manager:
          </span>
          <span className="text-sm font-bold text-foreground">npm</span>
          <span className="text-sm text-muted-foreground">/</span>
          <Link
            className="group inline-flex items-center gap-x-1 text-sm text-primary decoration-2 hover:underline font-medium"
            href="#"
          >
            Installation Guide
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:scale-110 transition" />
          </Link>
        </div>
      </div>
    </main>
  );
}
