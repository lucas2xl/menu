import { faqs } from "@/lib/faq";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function FAQs() {
  return (
    <SectionWrapper id="faqs">
      <div>
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-extrabold sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="mt-3 text-muted-foreground">
            Here are the most questions people always ask about.
          </p>
        </div>

        <div className="mt-12">
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
              {faqs.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <summary className="flex items-center justify-between font-semibold text-accent-foreground">
                    {item.q}
                  </summary>
                  <p
                    dangerouslySetInnerHTML={{ __html: item.a }}
                    className="leading-relaxed"
                  />
                </li>
              ))}
            </ul>
          </LayoutEffect>
        </div>
      </div>
    </SectionWrapper>
  );
}
