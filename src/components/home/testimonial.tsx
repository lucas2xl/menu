import Image from "next/image";

import { testimonials } from "@/lib/testimonials";
import { GradientWrapper } from "./gradient-wrapper";
import { LayoutEffect } from "./layout-effect";
import { SectionWrapper } from "./section-wrapper";

export function Testimonial() {
  return (
    <SectionWrapper>
      <div id="testimonials">
        <div className="max-w-2xl text-center md:mx-auto">
          <h2 className="text-foreground text-3xl font-semibold sm:text-4xl">
            Mailgo is loved by the best founders around the world
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
              {testimonials.map((item, idx) => (
                <li key={idx} className="p-4 rounded-xl border border-border">
                  <figure className="flex flex-col justify-between gap-y-6 h-full">
                    <blockquote className="">
                      <p className="text-muted-foreground">{item.quote}</p>
                    </blockquote>
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover"
                        width={56}
                        height={56}
                      />
                      <div>
                        <span className="block text-foreground font-semibold">
                          {item.name}
                        </span>
                        <span className="block text-sm mt-0.5 text-muted-foreground">
                          {item.title}
                        </span>
                      </div>
                    </div>
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
