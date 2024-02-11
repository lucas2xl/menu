import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GradientWrapper } from "./gradient-wrapper";
import { LayoutEffect } from "./layout-effect";

import heroImg from "@/components/images/hero.webp";
import { buttonVariants } from "../ui/button";
import { Spotlight } from "../ui/spotlight";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export function Hero() {
  return (
    <section className="py-28">
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div>
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 fill-primary" />
            <TextGenerateEffect
              words="Manage your email marketing using AI"
              textClassName="text-foreground text-4xl bg-clip-text bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
            />

            <p className="max-w-xl mx-auto text-muted-foreground">
              Gain control of your business&apos;s growth with Mailgo&apos;s
              comprehensive marketing, automation, and email marketing platform.
            </p>
            <div className="flex justify-center font-medium text-sm">
              <Link href="/#pricing" className={buttonVariants()}>
                Get Started
                <ChevronRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <GradientWrapper
            className="mt-16 sm:mt-28"
            wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]"
          >
            <Image
              src={heroImg}
              className="shadow-lg rounded-2xl"
              alt="Mailgo"
              width={1920}
              height={1080}
              placeholder="blur"
            />
          </GradientWrapper>
        </div>
      </LayoutEffect>
    </section>
  );
}
