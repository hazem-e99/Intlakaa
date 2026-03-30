import { motion } from "framer-motion";
import { memo } from "react";
import { Megaphone, BarChart3, MessageCircle, Search, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { pushGTMEvent } from "@/utils/gtm";

const services = [
  {
    icon: Megaphone, number: "01",
    title: "باقة المحتوى والإعلان", tagline: "كل ما تحتاجه من A إلى Z",
    color: "#9b50e8", glow: "rgba(155,80,232,0.2)",
    items: ["تخطيط حملات تسويقية مدروسة تناسب براندك", "خطة محتوى توصّل رسالتك للجمهور باحترافية", "سكربتات ومونتاج فيديوهات تبرز هويّة مشروعك", "تصميم صفحات هبوط احترافية تزيد التحويلات", "CRO مستمر مع متابعة دورية للأداء", "إدارة صفحاتك وتفاعلك مع الجمهور", "مدير حساب مخصص معك من الإطلاق للنتائج"],
  },
  {
    icon: BarChart3, number: "02",
    title: "باقة الإعلانات", tagline: "نُطلق ونتابع ونُحسّن",
    color: "#60a5fa", glow: "rgba(96,165,250,0.2)",
    items: ["إعداد الحملات وإطلاقها بالطريقة الصحيحة", "توجيهك بالمحتوى المطلوب للحملات الإعلانية", "متابعة يومية وتعديل مستمر عند الحاجة", "تقارير واضحة توريك اللي يجيب نتيجة فعلية"],
  },
  {
    icon: MessageCircle, number: "03",
    title: "الاستشارات", tagline: "خبرة تختصر عليك السنين",
    color: "#34d399", glow: "rgba(52,211,153,0.2)",
    items: ["استشارة تختصر عليك الوقت والمال", "خبراء جرّبوا الطريق قبلك ويعرفون ما يشتغل", "خبراء يشتغلون على متاجر بمليونات شهريًا"],
  },
  {
    icon: Search, number: "04",
    title: "البحث والتحليل", tagline: "بيانات تقود، لا تخمينات",
    color: "#fbbf24", glow: "rgba(251,191,36,0.2)",
    items: ["بحث وتحليل بأعلى المعايير العالمية وأسرع وقت", "تحليل دقيق لكل التفاصيل المؤثرة في نجاح حملتك", "نتائج منظّمة تريك الصورة كاملة بسهولة", "هدفنا مو بس نعرف الأرقام — هدفنا نضاعفها"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative rounded-3xl p-8 overflow-hidden group cursor-default"
      style={{ background: "rgba(21,11,46,0.5)", border: "1px solid rgba(155,80,232,0.1)", backdropFilter: "blur(12px)" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 30%, ${service.glow}, transparent 70%)` }} />
      {/* Number */}
      <div className="absolute top-6 left-6 text-5xl font-black opacity-[0.06] select-none" style={{ color: service.color }}>{service.number}</div>
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${service.color}12`, border: `1px solid ${service.color}25` }}>
        <Icon className="w-6 h-6" style={{ color: service.color }} strokeWidth={2} />
      </div>
      <h3 className="text-xl md:text-2xl font-black text-white mb-1">{service.title}</h3>
      <p className="text-sm mb-6" style={{ color: service.color }}>{service.tagline}</p>
      <ul className="space-y-3">
        {service.items.map((item, i) => (
          <motion.li key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + i * 0.05 }}
            className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
            <CheckCircle2 className="flex-shrink-0 w-4 h-4 mt-0.5" style={{ color: service.color }} strokeWidth={2.5} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

const ServicesSection = () => (
  <section className="relative section-py px-4 overflow-hidden section-bg-accent">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06]" style={{ background: "radial-gradient(circle, #9b50e8, transparent 70%)" }} />
    </div>
    <div className="container mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring" }}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2 mb-6" style={{ background: "rgba(155,80,232,0.1)", border: "1px solid rgba(155,80,232,0.2)" }}>
          <Megaphone className="w-4 h-4" style={{ color: "#9b50e8" }} strokeWidth={2.5} />
          <span className="text-sm font-bold text-white/90">خدماتنا</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-[1.3]">
          وش نقدر <span className="text-gradient">نضيف لمشروعك؟</span>
        </h2>
        <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">باقات متكاملة مصممة خصيصًا لتحقيق النمو الفعلي — لا وعود فضفاضة، بل نتائج قابلة للقياس.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((s, i) => <ServiceCard key={s.number} service={s} index={i} />)}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 text-center">
        <p className="text-white/35 text-sm mb-5">مو عارف أي باقة تناسبك؟ خلنا نساعدك تختار</p>
        <Link to="/form" onMouseEnter={prefetchForm}>
          <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => pushGTMEvent("cta_click", { button_name: "استشارة مجانية", location: "services_section" })}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-black text-white text-base shadow-xl"
            style={{ background: "linear-gradient(135deg, #7c3aed, #9b50e8)" }}>
            احجز استشارة مجانية <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default memo(ServicesSection);
