import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GradientWrapper } from "@/components/home/gradient-wrapper";
import { LayoutEffect } from "@/components/home/layout-effect";
import { buttonVariants } from "@/components/ui/button";

import bgPattern from "@/components/images/bg-pattern.webp";

export function End() {
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
                  Ainda com dúvidas sobre o processo?
                </h2>
                <p className="mt-5">
                  Com o Menu, prometemos revolucionar a tecnologia em benefício
                  da sua empresa. Não vendemos apenas um produto, vendemos
                  inovação. Com nossa solução, você se destacará no mercado.
                  Seus clientes lembrarão da experiência excepcional ao fazerem
                  seus pedidos em seu estabelecimento, encantados com a
                  praticidade e inovação, além de receberem atualizações em
                  tempo real sobre o status de seus pedidos.
                </p>
                <p className="mt-5">
                  E não é apenas isso. Nosso principal foco é a experiência do
                  usuário, proporcionando uma jornada tão incrível que o fará
                  querer retornar mais vezes. Além disso, nosso maior
                  compromisso é com a redução de custos. Com o Menu, você não
                  precisará mais manter dezenas de funcionários à disposição
                  para realizar pedidos. Essa necessidade pode ser reduzida em
                  até metade!
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
            src={bgPattern}
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
