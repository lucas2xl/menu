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
        <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
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
                "relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-800 mt-6 sm:mt-0",
                item.isMostPop && "border border-purple-500"
              )}
              style={{
                backgroundImage: item.isMostPop
                  ? "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)"
                  : "",
              }}
            >
              <div className="p-8 space-y-4 border-b border-gray-800 text-center">
                <span className="text-purple-600 font-medium">{item.name}</span>
                <div className="text-gray-50 text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-xl text-gray-400 font-normal">/mo</span>
                </div>
                <p className="text-gray-400">{item.desc}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3">
                  {item.features.map((featureItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-5 text-gray-300"
                    >
                      <CheckIcon className="h-5 w-5 text-indigo-600" />
                      {featureItem}
                    </li>
                  ))}
                </ul>
                <div className="pt-8">
                  <Button
                    className={cn(
                      "w-full",
                      item.isMostPop &&
                        "bg-purple-600 hover:bg-purple-500 focus:bg-purple-700 ring-purple-600",
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
