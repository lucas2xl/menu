import { CTA } from "@/components/home/cta";
import { FAQs } from "@/components/home/faqs";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { Pricing } from "@/components/home/pricing";
import { VisualFeatures } from "@/components/home/visual-features";
import { WhatsappFloat } from "@/components/whatsapp-float";

export default function HomePage() {
  return (
    <div className="relative max-w-screen-xl mx-auto px-4 md:px-8">
      <WhatsappFloat />

      <Navbar />
      <Hero />
      <VisualFeatures />
      <Features />
      <CTA />
      {/*<Testimonial />*/}
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );
}
