import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { memo, useEffect, useRef, useState, useMemo } from "react";
import { ArrowLeft, TrendingUp, Users, Zap, Star } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { pushGTMEvent } from "@/utils/gtm";

/* ── Animated Counter ──────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString("ar-SA")}{suffix}</span>;
}

/* ── Floating Orb ──────────────────────────────────────── */
function FloatingOrb({ x, y, delay, size, color }: { x: number; y: number; delay: number; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, filter: "blur(1px)" }}
      animate={{ y: [0, -25, 0], opacity: [0.15, 0.6, 0.15], scale: [1, 1.2, 1] }}
      transition={{ duration: 5 + delay, delay: delay * 0.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── Stats Data ────────────────────────────────────────── */
const stats = [
  { icon: TrendingUp, label: "مبيعات مُدارة", target: 100, suffix: "M+", color: "#34d399" },
  { icon: Star,       label: "عميل ناجح",     target: 220, suffix: "+",  color: "#fbbf24" },
  { icon: Zap,        label: "حملة ناجحة",    target: 500, suffix: "+",  color: "#60a5fa" },
];

/* ── HeroSection ───────────────────────────────────────── */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Replaced opacity fade-out with a subtle parallax effect
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Stable orbs
  const orbs = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.4,
      size: 3 + Math.random() * 6,
      color: i % 3 === 0 ? "rgba(155,80,232,0.6)" : i % 3 === 1 ? "rgba(192,132,252,0.4)" : "rgba(96,165,250,0.3)",
    })), []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-16 px-4 overflow-hidden">
      {/* ─ Parallax background ─ */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(170deg, #0d0520 0%, #1a0a34 40%, #130828 70%, #0d0520 100%)" }} />
        
        {/* Radial glow: primary */}
        <motion.div
          className="absolute top-[-8%] right-[-8%] w-[650px] h-[650px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(155,80,232,0.22) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Radial glow: secondary */}
        <motion.div
          className="absolute bottom-[-8%] left-[-8%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(155,80,232,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(155,80,232,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(155,80,232,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Floating orbs */}
        {orbs.map((o, i) => <FloatingOrb key={i} {...o} />)}
      </motion.div>

      {/* ─ Content ─ */}
      <motion.div className="container mx-auto relative z-10" style={{ y: contentY }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Right: Text ── */}
          <div className="text-right space-y-8 order-2 lg:order-1">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full px-5 py-2.5"
              style={{ background: "rgba(155,80,232,0.12)", border: "1px solid rgba(155,80,232,0.25)" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm font-bold text-white/90 tracking-wide">وكالة تسويق رقمي رائدة في السعودية 🇸🇦</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.7] md:leading-[1.6] text-white">
                <span className="block mb-5">بنساعدك تخلي</span>
                <span className="block">
                  نموك أسرع و{" "}
                  <span
                    className="inline-block mt-3 md:mt-2 py-3 px-1"
                    style={{
                      background: "linear-gradient(135deg, #c084fc, #9b50e8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    حملاتك أذكى
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 leading-[2] font-medium max-w-xl mr-auto"
            >
              بخطط تسويقية قائمة على النتائج، واستراتيجيات مصممة لعلامتك التجارية — نوصلك لأفضل عائد بأقل مجهود.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-start items-center"
            >
              <Link to="/form" onMouseEnter={prefetchForm} onFocus={prefetchForm} onTouchStart={prefetchForm}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pushGTMEvent("cta_click", { button_name: "احجز استشارتك المجانية", location: "hero_section" })}
                  className="relative group px-10 py-4 rounded-full text-base md:text-lg font-black text-white shadow-2xl overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #9b50e8, #c084fc)" }}
                >
                  {/* Shimmer */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
                  {/* Glow */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl" style={{ background: "linear-gradient(135deg, #9b50e8, #c084fc)" }} />
                  <span className="relative flex items-center gap-3">
                    احجز استشارتك المجانية
                    <ArrowLeft className="w-5 h-5" />
                  </span>
                </motion.button>
              </Link>

              <a href="tel:+966532759488">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full text-base font-bold text-white/90 backdrop-blur-sm transition-all"
                  style={{ border: "1px solid rgba(155,80,232,0.35)", background: "rgba(155,80,232,0.08)" }}
                >
                  اتصل بنا مباشرة
                </motion.button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(155,80,232,0.15)" }}
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center md:text-right">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-2xl md:text-3xl font-black" style={{ color: stat.color }}>
                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      </span>
                    </div>
                    <div className="text-xs md:text-sm text-white/55 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Left: Hero Visual with 3D perspective ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: 8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 70 }}
            className="order-1 lg:order-2 relative hidden md:flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* Deep Glow backing the image */}
            <div
              className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] opacity-40"
              style={{ background: "radial-gradient(circle, #9b50e8, transparent 70%)" }}
            />
            
            {/* Hero graphics container */}
            <div className="relative z-10 w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto flex items-center justify-center transform scale-110 md:scale-125 lg:scale-110 lg:-translate-x-6">
              <img
                src="/hero%20section.png"
                alt="وكالة انطلاقة للخدمات التسويقية"
                loading="eager"
                className="w-full h-auto object-contain"
                style={{ filter: "drop-shadow(0 25px 45px rgba(155,80,232,0.2))" }}
              />
            </div>

            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 -right-4 md:-right-8 rounded-2xl px-5 py-3"
              style={{ background: "rgba(13,5,32,0.85)", border: "1px solid rgba(155,80,232,0.2)", backdropFilter: "blur(16px)" }}
            >
              <div className="text-xs text-white/50 font-medium">رضا العملاء</div>
              <div className="text-lg font-black text-emerald-400">98.7%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute top-8 -left-4 md:-left-8 rounded-2xl px-5 py-3"
              style={{ background: "rgba(13,5,32,0.85)", border: "1px solid rgba(155,80,232,0.2)", backdropFilter: "blur(16px)" }}
            >
              <div className="text-xs text-white/50 font-medium">نمو المبيعات</div>
              <div className="text-lg font-black text-amber-400">+340%</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/35 text-xs font-medium">اسحب للأسفل</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex items-start justify-center p-1.5"
          style={{ border: "2px solid rgba(155,80,232,0.3)" }}
        >
          <div className="w-1 h-1.5 rounded-full bg-[#9b50e8]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(HeroSection);
