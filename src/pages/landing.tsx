import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Templates from "@/components/templates";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
