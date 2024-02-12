import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "../ui/button";
import { GradientWrapper } from "./gradient-wrapper";
import { LayoutEffect } from "./layout-effect";

export function CTA() {
  return (
    <section>
      <GradientWrapper wrapperClassName="max-w-xs h-[13rem] top-12 inset-0">
        <div className="py-28 relative">
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-6",
            }}
          >
            <div className="relative z-10">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
                  Desbloqueie o Poder da Tecnologia com o Menu
                </h2>
                <p className="mt-5">
                  O Menu é a solução definitiva! Nossa plataforma inteligente
                  revoluciona a forma como você gerencia seu negócio. Com
                  recursos avançados e personalizados, você pode dominar o
                  mercado, oferecer uma experiência imbatível aos clientes e
                  maximizar seus lucros.
                </p>
              </div>
              <div className="mt-5 flex justify-center font-medium text-sm">
                <Link href="/#pricing" className={buttonVariants()}>
                  Transforme seu negócio
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </LayoutEffect>

          <Image
            src="/images/bg-pattern.webp"
            className="w-full h-full object-cover  m-auto absolute inset-0 pointer-events-none"
            alt="Background pattern"
            width={500}
            height={500}
          />
        </div>
      </GradientWrapper>
    </section>
  );
}
