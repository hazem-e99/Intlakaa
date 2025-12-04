import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { memo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  // Stats removed — simplified hero layout

  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-20 pb-6 px-4">
      {/* Background decorations removed as requested (kept empty) */}

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Right Side */}
          <div className="text-right space-y-8 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-6 py-2 backdrop-blur-sm">
              <span className="w-4 h-4 rounded-full bg-primary inline-block" />
              <span className="text-sm font-bold tracking-wide">وكالة تسويق رائدة</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.4] tracking-tight">
              <span className="block mb-2">بنساعدك تخلي</span>
              <span className="inline-block font-black text-foreground">نموك أسرع</span>
              <span className="font-black">… </span>
              <span className="text-gradient inline-block pt-3">وحملاتك أذكى</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-[2] font-medium">
              بخطط تسويقية قائمة على النتائج، واستراتيجيات عالمية مصممة خصيصًا لعلامتك التجارية، نوصلك لأفضل عائد بأقل مجهود..
            </p>

            {/* CTA Buttons (moved up after removing stats) */}
            <div className="flex gap-4 justify-start items-center mt-2">
              <Link to="/form" onMouseEnter={prefetchForm} onFocus={prefetchForm} onTouchStart={prefetchForm}>
                <button className="group relative gradient-brand text-white px-10 py-4 rounded-full text-base md:text-lg font-black tracking-wide shadow-medium hover:shadow-lg transition-all overflow-hidden">
                  <span className="absolute inset-0 bg-white/20" />
                  <span className="relative flex items-center gap-2">
                    احجز استشارتك المجانية
                    <span>
                      <FaArrowLeft className="w-5 h-5" />
                    </span>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Image - Left Side (static) */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <img src={logo} alt="Digital Marketing" loading="eager" className="relative w-full h-auto " />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator removed as requested */}
    </section>
  );
};

export default memo(HeroSection);
