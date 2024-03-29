import Image from "next/image";

import { visualFeatures } from "@/utils/features";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function VisualFeatures() {
  return (
    <SectionWrapper>
      <div className="text-muted-foreground">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-6",
          }}
        >
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
              Maximize a eficiência e satisfação com o Menu
            </h2>
            <p className="mt-3">
              Com o Menu, você pode otimizar seus processos de pedidos,
              oferecendo uma experiência mais conveniente e satisfatória para
              seus clientes. Além disso, nossas soluções inteligentes podem
              ajudar a reduzir custos operacionais, tornando-se uma escolha
              financeiramente inteligente para o seu negócio.
            </p>
          </div>
        </LayoutEffect>

        <LayoutEffect
          className="duration-1000 delay-500"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0",
          }}
        >
          <div className="mt-12">
            <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
              {visualFeatures.map((item, index) => (
                <li
                  key={index}
                  className="flex-1 flex flex-col justify-between border border-border rounded-2xl bg-card overflow-hidden"
                >
                  <div className="p-8">
                    <h3 className="text-foreground text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 sm:text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="pl-8">
                    <Image
                      src={item.img}
                      className="w-full ml-auto bg-primary rounded-tl-2xl rounded-bl-2xl"
                      height={200}
                      width={200}
                      alt={item.title}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
}
