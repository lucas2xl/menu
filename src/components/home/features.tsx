import { features } from "@/lib/features";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Features() {
  return (
    <SectionWrapper>
      <div id="features" className="text-gray-300">
        <LayoutEffect
          className="duration-1000 delay-300"
          isInviewState={{
            trueState: "opacity-1",
            falseState: "opacity-0 translate-y-6",
          }}
        >
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
              Start growing your email marketing with Mailgo
            </h2>
            <p className="mt-3">
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
                  className="space-y-3 p-4 rounded-xl border border-gray-800"
                  style={{
                    background:
                      "radial-gradient(157.73% 157.73% at 50% -29.9%, rgba(203, 213, 225, 0.16) 0%, rgba(203, 213, 225, 0) 100%)",
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg text-gray-50">
                    {item.icon}
                  </div>
                  <h3 className="text-lg text-gray-50 font-semibold">
                    {item.title}
                  </h3>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </LayoutEffect>
      </div>
    </SectionWrapper>
  );
}
