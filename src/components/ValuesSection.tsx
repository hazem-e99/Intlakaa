import { motion, useScroll, useTransform } from "framer-motion";
import { FaUsers, FaBullseye, FaBookOpen, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useRef } from "react";
import { Link } from "react-router-dom";

const timelineSteps = [
  {
    icon: FaRocket,
    title: "البداية الصحيحة",
    text: "ودّع الحملات العشوائية ما توصلك بعيد، ومع انطلاقة تختصر وقت نموك مع أفضل الاستراتيجيات في المجال، مصممة خصيصًا على احتياجك وهدفك.",
    position: "right",
  },
  {
    icon: FaUsers,
    title: "خبراء نمو فعليين",
    text: "بخبرة متراكمة تجاوزت مئات الملايين من المبيعات، نشتغل على كل مراحل النمو: من التأسيس المتين إلى التصعيد",
    position: "left",
  },
  {
    icon: FaBullseye,
    title: "عملاء محدودين، تركيز عالي",
    text: "سياستنا نخدم عدد محدود جدًا من العملاء شهريًا، عشان نعطي كل عميل أعلى تركيز ونتائج فعليّة",
    position: "right",
  },
  {
    icon: HiSparkles,
    title: "فريق عالمي المستوى",
    text: "أكثر من 25 استراتيجي تسويق، ومدراء حملات إعلانية (Performance Marketers)، ومخرجين إبداعيين وكتاب بيع مباشر، على مستويات عالمية",
    position: "left",
  },
  {
    icon: FaBookOpen,
    title: "نستثمر في العقول قبل الأدوات",
    text: "أكبر استثمارنا هو الفريق والتعلم من أساطير التسويق حول العالم، ندرس الأفضل… عشان نكون الأفضل دائمًا",
    position: "right",
  },
];

const ValuesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
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
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-6 py-2 backdrop-blur-sm mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-sm font-bold tracking-wide">رحلة النمو معنا</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.5] text-gradient">
            انطلاقة | لأن النمو ما يصير صدفة
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            رحلة نموك تبدأ من هنا، مع فريق متكامل ومتخصص يرافقك في كل خطوة
          </p>
        </motion.div>
        
        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 transform -translate-x-1/2 hidden lg:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full gradient-brand origin-top"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 lg:space-y-24">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  step.position === "right"
                    ? "lg:flex-row-reverse lg:text-left"
                    : "lg:flex-row lg:text-right"
                }`}
              >
                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`lg:w-[calc(50%-3rem)] w-full bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all border border-primary/10 ${
                    step.position === "right" ? "lg:mr-auto" : "lg:ml-auto"
                  }`}
                >
                  <div className={`flex gap-6 items-start ${step.position === "right" ? "" : "flex-row-reverse"}`}>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-lg"
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className={`flex-1 ${step.position === "right" ? "text-right" : "text-left"}`}>
                      <motion.h3 
                        className="text-2xl md:text-3xl font-black mb-4 text-gradient"
                        whileHover={{ scale: 1.02 }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-[2]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Center Circle Indicator (Desktop Only) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="hidden lg:block absolute left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="relative w-6 h-6"
                  >
                    <div className="absolute inset-0 rounded-full gradient-brand" />
                    <motion.div
                      className="absolute inset-0 rounded-full gradient-brand opacity-50"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Number Badge (Mobile Only) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="lg:hidden absolute -top-3 right-8 w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold shadow-lg"
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* End Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 flex justify-center"
          >
            <Link to="/form">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer"
              >
                <div className="px-8 py-4 rounded-full gradient-brand text-white font-bold text-lg shadow-xl">
                  ابدأ رحلتك معنا اليوم
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full gradient-brand opacity-30 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
