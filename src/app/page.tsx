import { CTA } from "@/components/home/cta";
import { End } from "@/components/home/end";
import { FAQs } from "@/components/home/faqs";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Leverage } from "@/components/home/leverage";
import { Navbar } from "@/components/home/navbar";
import { Steps } from "@/components/home/steps";
import { VisualFeatures } from "@/components/home/visual-features";

export default function HomePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <Navbar />
      <Hero />
      <VisualFeatures />
      <CTA />
      <Features />
      <Leverage />
      <Steps />
      {/* <Pricing /> */}
      <End />
      <FAQs />
      <Footer />
    </div>
  );
}
