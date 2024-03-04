import { Benefits } from "@/components/home/benefits";
import { CTA } from "@/components/home/cta";
import { FAQs } from "@/components/home/faqs";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { VisualFeatures } from "@/components/home/visual-features";

export default function HomePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <Navbar />
      <Hero />
      <VisualFeatures />
      <Features />
      <CTA />
      <Benefits />
      <FAQs />
      <Footer />
    </div>
  );
}
