import { benefits } from "@/utils/benefits";
import { Separator } from "../ui/separator";
import { GradientWrapper } from "./gradient-wrapper";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Benefits() {
  return (
    <SectionWrapper>
      <div id="testimonials">
        <div className="max-w-2xl text-center md:mx-auto">
          <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
            Benefícios do Menu
          </h2>
        </div>
        <GradientWrapper
          wrapperClassName="max-w-sm h-40 top-12 inset-x-0"
          className="mt-12"
        >
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((item, index) => (
                <li key={index} className="p-4 rounded-xl border border-border">
                  <figure className="flex flex-col justify-between gap-y-4">
                    <div className="flex items-center gap-x-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary font-bold">
                        {index + 1}
                      </div>

                      <span className="block text-sm text-muted-foreground">
                        {item.title}
                      </span>
                    </div>

                    <Separator />

                    <blockquote>
                      <p className="text-muted-foreground">{item.quote}</p>
                    </blockquote>
                  </figure>
                </li>
              ))}
            </ul>
          </LayoutEffect>
        </GradientWrapper>
      </div>
    </SectionWrapper>
  );
}
