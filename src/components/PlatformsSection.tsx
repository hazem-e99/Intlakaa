import { motion } from "framer-motion";
import { useState, memo } from "react";

const platforms = [
  { name: "سلة", logo: "/Logos/sallaLogo.png", color: "from-green-500 to-emerald-500", bgGlow: "rgba(16, 185, 129, 0.2)" },
  { name: "زد", logo: "/Logos/ZidLogo.png", color: "from-blue-500 to-cyan-500", bgGlow: "rgba(59, 130, 246, 0.2)" },
  { name: "TikTok", logo: "/Logos/TikTokLogo.png", color: "from-pink-500 to-purple-500", bgGlow: "rgba(236, 72, 153, 0.2)" },
  { name: "Snapchat", logo: "/Logos/SnapchatLogo.jpg", color: "from-yellow-400 to-amber-500", bgGlow: "rgba(251, 191, 36, 0.2)" },
  { name: "Meta", logo: "/Logos/MetaLogo.png", color: "from-blue-600 to-indigo-600", bgGlow: "rgba(37, 99, 235, 0.2)" },
  { name: "Google Ads", logo: "/Logos/GoogleAds.png", color: "from-red-500 to-orange-500", bgGlow: "rgba(239, 68, 68, 0.2)" },
];

const PlatformsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-8 md:py-32 px-4 bg-background overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(155, 80, 232, 0.3), transparent)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, rgba(231, 116, 255, 0.3), transparent)" }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2">
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                شركاء النجاح
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-primary py-4 bg-clip-text text-transparent">
            المنصات التي نُبدع فيها
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            نحول حضورك الرقمي لتجربة استثنائية عبر أقوى المنصات العالمية
          </p>
        </motion.div>
      </div>

      {/* شبكة اللوجوهات الإبداعية */}
      <div className="container mx-auto relative z-10">
        {/* شريط أفقي للموبايل والتابلت */}
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto no-scrollbar pb-4 md:hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="relative group"
            >
              <div className="relative aspect-square bg-card/50 backdrop-blur-xl rounded-3xl p-2 flex items-center justify-center transition-all duration-300 overflow-hidden min-w-[72px] w-[72px] h-[72px]">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  loading="lazy"
                  className="relative w-10 h-10 object-contain transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* شبكة أعمدة للديسكتوب */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              {hoveredIndex === index && (
                <div
                  className="absolute -inset-2 rounded-3xl blur-xl opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${platform.bgGlow}, transparent)`,
                  }}
                />
              )}
              <div className="relative aspect-square bg-card/50 backdrop-blur-xl rounded-3xl p-8 flex items-center justify-center transition-all duration-300 overflow-hidden min-w-0 w-full">
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-100" />
                )}
                <img
                  src={platform.logo}
                  alt={platform.name}
                  loading="lazy"
                  className="relative w-full h-full object-contain transition-all duration-500"
                  style={hoveredIndex === index ? { transform: 'scale(1.1)', filter: 'brightness(1.15) contrast(1.1)' } : {}}
                />
                {hoveredIndex === index && (
                  <div className="absolute bottom-3 left-0 right-0 text-center opacity-100 transition-opacity duration-300">
                    <span className={`text-xs font-bold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(PlatformsSection);
