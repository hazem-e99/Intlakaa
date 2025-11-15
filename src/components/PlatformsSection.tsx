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
    <section className="relative py-32 px-4 bg-background overflow-hidden">
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

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            المنصات التي نُبدع فيها
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            نحول حضورك الرقمي لتجربة استثنائية عبر أقوى المنصات العالمية
          </p>
        </motion.div>
      </div>
      
      {/* شبكة اللوجوهات الإبداعية */}
      <div className="container mx-auto relative z-10">
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* خلفية متوهجة */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${platform.bgGlow}, transparent)`,
                  }}
                  animate={hoveredIndex === index ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: hoveredIndex === index ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* الكارت */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative aspect-square bg-card/50 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-center transition-all duration-300 overflow-hidden"
                >
                  {/* تأثير لمعان */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ 
                      x: "100%", 
                      y: "100%",
                    }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* نقاط مضيئة */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r ${platform.color} rounded-full`}
                          initial={{ 
                            x: "50%", 
                            y: "50%",
                            opacity: 0,
                            scale: 0,
                          }}
                          animate={{
                            x: `${50 + Math.cos((i * 120) * Math.PI / 180) * 80}%`,
                            y: `${50 + Math.sin((i * 120) * Math.PI / 180) * 80}%`,
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* اللوجو */}
                  <motion.img
                    src={platform.logo}
                    alt={platform.name}
                    loading="lazy"
                    className="relative w-full h-full object-contain p-4 transition-all duration-500"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      filter: "brightness(1.15) contrast(1.1)",
                    }}
                  />

                  {/* اسم المنصة */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className={`text-xs font-bold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.name}
                    </span>
                  </motion.div>
                </motion.div>

                {/* حلقة دوارة */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-20`}
                  style={{
                    WebkitMaskImage: "linear-gradient(transparent 50%, black 50%)",
                    maskImage: "linear-gradient(transparent 50%, black 50%)",
                  }}
                  animate={hoveredIndex === index ? {
                    rotate: 360,
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: hoveredIndex === index ? Infinity : 0,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(PlatformsSection);
