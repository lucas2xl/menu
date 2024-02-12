import { features } from "@/lib/features";
import { HoverEffect } from "../ui/card-hover-effect";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Features() {
  return (
    <SectionWrapper>
      <div id="features">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-6",
          }}
        >
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
              Maximize o Potencial do seu Negócio com o Menu Inteligente
            </h2>
            <p className="mt-3 text-muted-foreground">
              O Menu oferece uma solução completa para impulsionar suas vendas.
              Obtenha atualizações em tempo real sobre o status dos pedidos,
              analise tendências de vendas e acesse relatórios detalhados para
              tomar decisões estratégicas informadas. Transforme a experiência
              do seu cliente e aumente a eficácia das suas operações com o Menu.
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
          <div className="relative mt-12">
            <HoverEffect items={features} />
          </div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
}
