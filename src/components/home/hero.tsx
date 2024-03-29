import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GradientWrapper } from "./gradient-wrapper";
import { LayoutEffect } from "./layout-effect";

import heroImg from "@/components/images/hero.png";
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
            <Spotlight className="-top-40 -left-0 md:left-60 md:-top-20 fill-primary" />

            <TextGenerateEffect
              words="Acelere sua empresa com Menu"
              textClassName="text-foreground text-4xl bg-clip-text bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
            />

            <p className="max-w-xl mx-auto text-muted-foreground">
              Com nosso produto, prometemos acelerar em até 100% o processo de
              pedidos da sua empresa, com o objetivo de aumentar a satisfação do
              seu cliente e reduzir seus gastos desnecessários.
            </p>
            <div className="flex justify-center font-medium text-sm">
              <Link href="/#pricing" className={buttonVariants()}>
                Transforme seu Negócio Agora!
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
