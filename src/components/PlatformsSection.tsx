import { motion } from "framer-motion";
import { useState } from "react";

const platforms = [
  { name: "سلة", logo: "/Logos/sallaLogo.png", color: "from-green-500/20 to-emerald-500/20" },
  { name: "زد", logo: "/Logos/ZidLogo.png", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "TikTok", logo: "/Logos/TikTokLogo.png", color: "from-pink-500/20 to-purple-500/20" },
  { name: "Snapchat", logo: "/Logos/SnapchatLogo.jpg", color: "from-yellow-500/20 to-amber-500/20" },
  { name: "Meta", logo: "/Logos/MetaLogo.png", color: "from-blue-600/20 to-indigo-500/20" },
  { name: "Google Ads", logo: "/Logos/GoogleAds.png", color: "from-red-500/20 to-orange-500/20" },
];

const PlatformsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-40 px-4 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      {/* شبكة خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(155, 80, 232, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(155, 80, 232, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* كرات متوهجة عائمة */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-64 h-64 rounded-full blur-3xl`}
          style={{
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(155, 80, 232, 0.15), transparent)'
              : 'radial-gradient(circle, rgba(231, 116, 255, 0.15), transparent)',
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="container mx-auto mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge فاخر */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-gradient-to-r from-primary via-secondary to-primary text-white px-8 py-3 rounded-full text-sm font-black tracking-wider uppercase shadow-2xl">
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.5), #fff)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  شركاء النجاح
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* العنوان الرئيسي مع تأثيرات */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <motion.span
              className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              المنصات التي نُبدع فيها
            </motion.span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            نحول حضورك الرقمي لتجربة استثنائية عبر أقوى المنصات العالمية
          </motion.p>
        </motion.div>
      </div>
      
      {/* الشرائط المتحركة بتصميم ثلاثي الأبعاد */}
      <div className="relative">
        {/* فيد متدرج فاخر */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/90 to-transparent z-30" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/90 to-transparent z-30" />
        
        {/* الشريط الأول - بزاوية */}
        <motion.div
          className="flex gap-10 items-center mb-10"
          style={{ rotateX: 2 }}
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {[...platforms, ...platforms].map((platform, index) => (
            <motion.div
              key={`row1-${platform.name}-${index}`}
              className="flex-shrink-0 relative group cursor-pointer perspective-1000"
              whileHover={{ 
                scale: 1.1, 
                zIndex: 100,
                rotateY: 5,
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ duration: 0.4, type: "spring" }}
            >
              {/* توهج ديناميكي */}
              <motion.div
                className={`absolute -inset-4 bg-gradient-to-br ${platform.color} rounded-3xl blur-2xl`}
                animate={{
                  opacity: hoveredIndex === index ? [0.3, 0.8, 0.3] : [0.2, 0.4, 0.2],
                  scale: hoveredIndex === index ? [1, 1.2, 1] : [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* الكارت الرئيسي */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-card/90 dark:to-card/70 backdrop-blur-2xl rounded-3xl p-12 w-80 h-52 flex items-center justify-center border border-white/20 dark:border-primary/20 shadow-[0_20px_60px_rgba(155,80,232,0.3)] overflow-hidden group-hover:border-primary/40 transition-all"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* شبكة ديناميكية */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, rgba(155, 80, 232, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* تأثير لمعان متطور */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.3,
                  }}
                />

                {/* جزيئات عائمة */}
                {hoveredIndex === index && [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full"
                    initial={{ 
                      x: 0, 
                      y: 0,
                      opacity: 0 
                    }}
                    animate={{
                      x: Math.cos(i * 60 * Math.PI / 180) * 100,
                      y: Math.sin(i * 60 * Math.PI / 180) * 100,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
                
                <motion.img
                  src={platform.logo}
                  alt={platform.name}
                  className="relative max-w-full max-h-full object-contain filter drop-shadow-2xl"
                  animate={{
                    filter: hoveredIndex === index 
                      ? "brightness(1.2) contrast(1.1)" 
                      : "brightness(1) contrast(1)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* الشريط الثاني - بزاوية معاكسة */}
        <motion.div
          className="flex gap-10 items-center"
          style={{ rotateX: -2 }}
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {[...platforms, ...platforms].map((platform, index) => (
            <motion.div
              key={`row2-${platform.name}-${index}`}
              className="flex-shrink-0 relative group cursor-pointer perspective-1000"
              whileHover={{ 
                scale: 1.1, 
                zIndex: 100,
                rotateY: -5,
              }}
              onHoverStart={() => setHoveredIndex(index + 100)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ duration: 0.4, type: "spring" }}
            >
              {/* توهج ديناميكي */}
              <motion.div
                className={`absolute -inset-4 bg-gradient-to-br ${platform.color} rounded-3xl blur-2xl`}
                animate={{
                  opacity: hoveredIndex === index + 100 ? [0.3, 0.8, 0.3] : [0.2, 0.4, 0.2],
                  scale: hoveredIndex === index + 100 ? [1, 1.2, 1] : [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* الكارت الرئيسي */}
              <motion.div 
                className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-card/90 dark:to-card/70 backdrop-blur-2xl rounded-3xl p-12 w-80 h-52 flex items-center justify-center border border-white/20 dark:border-secondary/20 shadow-[0_20px_60px_rgba(231,116,255,0.3)] overflow-hidden group-hover:border-secondary/40 transition-all"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* شبكة ديناميكية */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, rgba(231, 116, 255, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* تأثير لمعان متطور */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.3,
                  }}
                />

                {/* جزيئات عائمة */}
                {hoveredIndex === index + 100 && [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-secondary/30 rounded-full"
                    initial={{ 
                      x: 0, 
                      y: 0,
                      opacity: 0 
                    }}
                    animate={{
                      x: Math.cos(i * 60 * Math.PI / 180) * 100,
                      y: Math.sin(i * 60 * Math.PI / 180) * 100,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
                
                <motion.img
                  src={platform.logo}
                  alt={platform.name}
                  className="relative max-w-full max-h-full object-contain filter drop-shadow-2xl"
                  animate={{
                    filter: hoveredIndex === index + 100
                      ? "brightness(1.2) contrast(1.1)" 
                      : "brightness(1) contrast(1)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformsSection;

const platforms = [
  { name: "سلة", logo: "/Logos/sallaLogo.png" },
  { name: "زد", logo: "/Logos/ZidLogo.png" },
  { name: "TikTok", logo: "/Logos/TikTokLogo.png" },
  { name: "Snapchat", logo: "/Logos/SnapchatLogo.jpg" },
  { name: "Meta", logo: "/Logos/MetaLogo.png" },
  { name: "Google Ads", logo: "/Logos/GoogleAds.png" },
];

const PlatformsSection = () => {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
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
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold">
              شركاء النجاح
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            المنصات التي نتقنها
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نعمل على أقوى المنصات العالمية لنوصل علامتك لأبعد مدى
          </p>
        </motion.div>
      </div>
      
      {/* الشريط المتحرك بتصميم ثلاثي الأبعاد */}
      <div className="relative">
        {/* تأثير الفيد على الجوانب */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />
        
        {/* الشريط الأول */}
        <motion.div
          className="flex gap-8 items-center mb-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...platforms, ...platforms].map((platform, index) => (
            <motion.div
              key={`row1-${platform.name}-${index}`}
              className="flex-shrink-0 relative group cursor-pointer"
              whileHover={{ scale: 1.05, zIndex: 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* التوهج الخلفي */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              />
              
              {/* الكارت */}
              <div className="relative bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-2xl p-10 w-72 h-48 flex items-center justify-center border-2 border-primary/30 shadow-[0_8px_32px_rgba(155,80,232,0.2)] hover:shadow-[0_12px_48px_rgba(155,80,232,0.4)] transition-all overflow-hidden">
                {/* تأثير اللمعان المتحرك */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.2,
                  }}
                />
                
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="relative max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* الشريط الثاني - اتجاه معاكس */}
        <motion.div
          className="flex gap-8 items-center"
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...platforms, ...platforms].map((platform, index) => (
            <motion.div
              key={`row2-${platform.name}-${index}`}
              className="flex-shrink-0 relative group cursor-pointer"
              whileHover={{ scale: 1.05, zIndex: 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* التوهج الخلفي */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              />
              
              {/* الكارت */}
              <div className="relative bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-2xl p-10 w-72 h-48 flex items-center justify-center border-2 border-secondary/30 shadow-[0_8px_32px_rgba(155,80,232,0.2)] hover:shadow-[0_12px_48px_rgba(155,80,232,0.4)] transition-all overflow-hidden">
                {/* تأثير اللمعان المتحرك */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.2,
                  }}
                />
                
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="relative max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformsSection;
