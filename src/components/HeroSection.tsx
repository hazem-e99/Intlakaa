import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { useState, useEffect, useMemo, memo } from "react";
import { FaArrowLeft, FaPhoneAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { IoTrendingUp, IoFlash } from "react-icons/io5";
import heroImage from "@/assets/hero-image.png";
import logo from "@/assets/logo.png"

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax effect



  // Throttle mouse move events for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }, 50); // Throttle to 50ms
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Memoize stats to prevent recreation on every render
  const stats = useMemo(() => [
    { value: "+250%", label: "نمو بالمبيعات يوصل لـ 250%" },
    { value: "500K+", label: "وصول شهري يوصل لـ 500K" },
    { value: "95%", label: "معدل نجاح الحملات بنسبة 95%" },
  ], []);

  // Floating elements animation
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-20 pb-6 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 right-1/4 text-primary/20"
          animate={floatingAnimation}
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        >
          <HiSparkles size={40} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-1/4 text-secondary/20"
          animate={{
            y: [0, -20, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 1 },
          }}
          style={{ x: mousePosition.x * -0.3, y: mousePosition.y * -0.3 }}
        >
          <IoTrendingUp size={50} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/3 text-primary/20"
          animate={{
            y: [0, -20, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 2 },
          }}
          style={{ x: mousePosition.x * 0.7, y: mousePosition.y * 0.7 }}
        >
          <IoFlash size={35} />
        </motion.div>
      </div>

      <motion.div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right space-y-8 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-6 py-2 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <HiSparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-bold tracking-wide">وكالة تسويق رائدة</span>
            </motion.div>

            {/* Main Heading with Animated Characters */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.4] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="block mb-2"
              >
                بنساعدك تخلي
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-block font-black text-foreground"
                whileHover={{ scale: 1.05 }}
              >
                نموك أسرع
              </motion.span>
              <span className="font-black">… </span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-gradient inline-block pt-3"
                whileHover={{ scale: 1.05 }}
              >
                وحملاتك أذكى
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-[2] font-medium"
            >
              بخطط تسويقية قائمة على النتائج، واستراتيجيات عالمية مصممة خصيصًا لعلامتك التجارية، نوصلك لأفضل عائد بأقل مجهود..
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 shadow-soft"
                >
                  <div className="text-2xl md:text-3xl font-black text-gradient tracking-tight">{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground font-semibold mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex gap-4 justify-start items-center"
            >
              <Link to="/form" onMouseEnter={prefetchForm} onFocus={prefetchForm} onTouchStart={prefetchForm}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative gradient-brand text-white px-10 py-4 rounded-full text-base md:text-lg font-black tracking-wide shadow-medium hover:shadow-lg transition-all overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: "100%", skewX: -20 }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center gap-2">
                    ابدأ الآن
                    <motion.span
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaArrowLeft className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image - Left Side with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 relative"
            style={{
              x: mousePosition.x * 0.5,
            }}
          >
            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/30 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl"
              animate={{
                scale: [1.5, 1, 1.5],
                opacity: [0.8, 0.5, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Image Container with 3D Effect */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) rotateX(${-mousePosition.y * 0.02}deg)`,
              }}
            >
              <motion.div
                className="absolute inset-0  opacity-20 rounded-3xl blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.img
                src={logo}
                alt="Digital Marketing"
                loading="eager"
                className="relative w-full h-auto rounded-3xl "
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="hidden md:block absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-primary/20"
              >

              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(HeroSection);
