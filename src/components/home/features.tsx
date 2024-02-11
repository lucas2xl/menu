import { features } from "@/lib/features";
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
              Start growing your email marketing with Mailgo
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mailgo makes it easy for you to create beautiful emails that get
              noticed and opened, track results, and build relationships with
              your customers.
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
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="space-y-3 p-4 rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-foreground rounded-lg text-background">
                    {item.icon}
                  </div>
                  <h3 className="text-lg text-foreground font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
}
