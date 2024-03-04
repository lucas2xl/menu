import { steps } from "@/utils/features";
import { HoverEffect } from "../ui/card-hover-effect";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Steps() {
  return (
    <SectionWrapper id="pricing">
      <div className="relative max-w-xl mx-auto text-center">
        <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Vamos alavancar suas vendas e diminuir os custos!
        </h2>
      </div>

      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div className="relative mt-12">
          <HoverEffect items={steps} isIcon={false} />
        </div>
      </LayoutEffect>
    </SectionWrapper>
  );
}
