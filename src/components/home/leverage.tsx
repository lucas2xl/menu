import Image from "next/image";
import { GradientWrapper } from "./gradient-wrapper";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Leverage() {
  return (
    <SectionWrapper>
      <div id="testimonials">
        <div className="max-w-2xl text-center md:mx-auto">
          <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
            Use a tecnologia a seu favor!
          </h2>
          <p className="mt-5">
            Transforme sua gestão de vendas com nossa plataforma moderna.
            Gerencie pedidos com facilidade para retirada, mesa e delivery.
            Destaque-se com funcionalidades intuitivas e resultados positivos.
            Com nosso produto, seus clientes podem acessar o cardápio e fazer
            pedidos com apenas um QR code. Simplifique e melhore sua operação
            hoje mesmo!
          </p>
        </div>
        <GradientWrapper
          wrapperClassName="max-w-sm h-40 top-12 inset-x-0"
          className="mt-12 justify-center flex"
        >
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <Image src="/QR.png" alt="" width={300} height={300} />
          </LayoutEffect>
        </GradientWrapper>
      </div>
    </SectionWrapper>
  );
}
