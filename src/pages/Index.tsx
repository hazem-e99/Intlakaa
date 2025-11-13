import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import PromoSection from "@/components/PromoSection";
import CaseStudySection from "@/components/CaseStudySection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ValuesSection from "@/components/ValuesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <PromoSection />
      <CaseStudySection />
      <ServicesSection />
      <ResultsSection />
      <ValuesSection />
      <Footer />
    </div>
  );
};

export default Index;
