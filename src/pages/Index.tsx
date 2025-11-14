import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

// Lazy load non-critical sections
const PlatformsSection = lazy(() => import("@/components/PlatformsSection"));
const PromoSection = lazy(() => import("@/components/PromoSection"));
const CaseStudySection = lazy(() => import("@/components/CaseStudySection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ResultsSection = lazy(() => import("@/components/ResultsSection"));
const ValuesSection = lazy(() => import("@/components/ValuesSection"));

// Lightweight loading skeleton
const SectionSkeleton = () => (
  <div className="py-20 px-4">
    <div className="container mx-auto">
      <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
      <div className="h-4 bg-muted rounded w-2/3 mx-auto animate-pulse"></div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <PlatformsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PromoSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CaseStudySection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ResultsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ValuesSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
