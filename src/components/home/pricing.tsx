import { CheckIcon } from "lucide-react";

import { plans } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Pricing() {
  return (
    <SectionWrapper id="pricing">
      <div className="relative max-w-xl mx-auto text-center">
        <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Find a plan to power your business
        </h2>
      </div>

      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "relative flex-1 flex items-stretch flex-col rounded-xl border border-border mt-6 sm:mt-0",
                item.isMostPop && "border border-primary"
              )}
            >
              <div className="p-8 space-y-4 border-b border-gray-800 text-center">
                <span className="text-primary font-medium">{item.name}</span>
                <div className="text-foreground text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-xl text-muted-foreground font-normal">
                    /mo
                  </span>
                </div>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3">
                  {item.features.map((featureItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-5 text-muted-foreground"
                    >
                      <CheckIcon className="h-5 w-5 text-primary" />
                      {featureItem}
                    </li>
                  ))}
                </ul>
                <div className="pt-8">
                  <Button
                    className={cn(
                      "w-full",
                      !item.isMostPop &&
                        "bg-gray-800 hover:bg-gray-700 ring-gray-800"
                    )}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutEffect>
    </SectionWrapper>
  );
}
