import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { useEffect } from "react";
import prefetchForm from "@/lib/prefetchForm";

// Lazy load non-critical sections (code splitting for performance)
const PlatformsSection     = lazy(() => import("@/components/PlatformsSection"));
const ResultsSection       = lazy(() => import("@/components/ResultsSection"));
const PromoSection         = lazy(() => import("@/components/PromoSection"));
const CustomersLogosSection= lazy(() => import("@/components/CustomersLogosSection"));
const CaseStudySection     = lazy(() => import("@/components/CaseStudySection"));
const ClientsSection       = lazy(() => import("@/components/ClientsSection"));
const ServicesSection      = lazy(() => import("@/components/ServicesSection"));
const FAQSection           = lazy(() => import("@/components/FAQSection"));
const ValuesSection        = lazy(() => import("@/components/ValuesSection"));

// Lightweight animated loading skeleton
const SectionSkeleton = () => (
  <div className="py-20 px-4" style={{ background: "inherit" }}>
    <div className="container mx-auto">
      <div className="h-8 bg-white/5 rounded-xl w-1/3 mx-auto mb-8 animate-pulse" />
      <div className="h-4 bg-white/5 rounded-xl w-2/3 mx-auto animate-pulse" />
    </div>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Defer prefetch until after initial paint to avoid blocking LCP
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => prefetchForm());
    } else {
      const id = setTimeout(() => prefetchForm(), 1500);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "#0d0520" }}>
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero — above the fold, eager load */}
      <HeroSection />

      {/* 3. Platforms – first social proof above fold */}
      <Suspense fallback={<SectionSkeleton />}>
        <PlatformsSection />
      </Suspense>

      {/* 4. Results – hard numbers build trust */}
      <Suspense fallback={<SectionSkeleton />}>
        <ResultsSection />
      </Suspense>

      {/* 5. Customer Logos — social proof marquee */}
      <Suspense fallback={<SectionSkeleton />}>
        <CustomersLogosSection />
      </Suspense>

      {/* 6. Mid-page CTA — capture warm traffic */}
      <Suspense fallback={<SectionSkeleton />}>
        <PromoSection />
      </Suspense>

      {/* 7. Case Studies — evidence */}
      <Suspense fallback={<SectionSkeleton />}>
        <CaseStudySection />
      </Suspense>

      {/* 8. Client Testimonial Videos — social proof */}
      <Suspense fallback={<SectionSkeleton />}>
        <ClientsSection />
      </Suspense>

      {/* 9. Services — what we offer */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>

      {/* 10. Values / Why Us timeline */}
      <Suspense fallback={<SectionSkeleton />}>
        <ValuesSection />
      </Suspense>

      {/* 11. FAQ — handle objections */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>

      {/* 12. Footer */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Index;
