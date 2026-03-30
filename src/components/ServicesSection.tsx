import { motion } from "framer-motion";
import { memo } from "react";
import { Megaphone, BarChart3, MessageCircle, Search, ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { pushGTMEvent } from "@/utils/gtm";

const services = [
  {
    icon: Megaphone, number: "01",
    title: "باقة المحتوى والإعلان", tagline: "كل ما تحتاجه من A إلى Z",
    color: "#9b50e8", glow: "rgba(155,80,232,0.3)",
    items: ["تخطيط حملات تسويقية مدروسة", "خطة محتوى توصّل رسالتك باحترافية", "سكربتات ومونتاج فيديوهات", "تصميم صفحات هبوط تزيد التحويلات", "تحسين مستمر للأداء (CRO)", "مدير حساب مخصص معك دائمًا"],
  },
  {
    icon: BarChart3, number: "02",
    title: "باقة الإعلانات", tagline: "نُطلق ونتابع ونُحسّن",
    color: "#60a5fa", glow: "rgba(96,165,250,0.3)",
    items: ["إعداد الحملات بالطريقة الصحيحة", "توجيه بنوع المحتوى المطلوب للإعلان", "متابعة يومية وتعديل مستمر", "تقارير شفافة توريك العائد الفعلي"],
  },
  {
    icon: MessageCircle, number: "03",
    title: "الاستشارات", tagline: "خبرة تختصر عليك السنين",
    color: "#34d399", glow: "rgba(52,211,153,0.3)",
    items: ["استشارة تختصر الوقت والمال", "خبرات عملية في السوق السعودي", "استراتيجيات مجربة لمتاجر كبرى"],
  },
  {
    icon: Search, number: "04",
    title: "البحث والتحليل", tagline: "بيانات تقود، لا تخمينات",
    color: "#fbbf24", glow: "rgba(251,191,36,0.3)",
    items: ["بحث تحليلي بأعلى المعايير", "دراسة المنافسين بدقة متناهية", "صورة كاملة لفرص مضاعفة الأرقام"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  // Make even cards structurally slighty different by adjusting border gradients based on color
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 60 }}
      whileHover={{ y: -10 }}
      className="relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden group cursor-pointer"
      style={{ 
        background: "linear-gradient(135deg, rgba(21,11,46,0.85) 0%, rgba(13,5,32,0.95) 100%)",
        border: "1px solid rgba(155,80,232,0.15)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
      }}
    >
      {/* Animated Gradient Glow on Hover */}
      <motion.div
        className="absolute -inset-[150%] opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${service.color} 180deg, transparent 360deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Glass Mask */}
      <div className="absolute inset-[1px] rounded-[calc(2.5rem-1px)] z-0" style={{ background: "rgba(13,5,32,0.96)" }} />

      {/* Large Floating Number Background */}
      <div 
        className="absolute -top-6 -left-6 text-[10rem] font-black opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 select-none z-0 pointer-events-none leading-none" 
        style={{ color: service.color, transform: "rotate(-10deg)" }}
      >
        {service.number}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center relative shadow-lg" style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
            <div className="absolute inset-0 blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500" style={{ background: service.color }} />
            <Icon className="w-8 h-8 relative z-10" style={{ color: service.color }} strokeWidth={2} />
          </div>
          <div className="text-right">
             <h3 className="text-2xl md:text-[1.75rem] font-black text-white mb-2">{service.title}</h3>
             <p className="text-sm font-bold" style={{ color: service.color }}>{service.tagline}</p>
          </div>
        </div>
        
        {/* Subtle Divider */}
        <div className="w-full h-px mb-6 opacity-30 group-hover:opacity-50 transition-opacity" style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />

        <ul className="space-y-4">
          {service.items.map((item, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.15 + i * 0.08 }}
              className="flex items-start gap-4 text-white/70 group-hover:text-white/90 transition-colors text-[0.95rem] font-medium leading-relaxed"
            >
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${service.color}40, ${service.color}10)`, border: `1px solid ${service.color}50` }}
              >
                <Check className="w-3.5 h-3.5" style={{ color: service.color }} strokeWidth={3} />
              </div>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

const ServicesSection = () => (
  <section className="relative py-32 md:py-40 px-4 overflow-hidden" style={{ background: "#0b0416" }} id="services">
    {/* Dynamic Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02]" 
        style={{ backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20" 
        style={{ background: "radial-gradient(circle, #9b50e8, transparent 70%)" }} 
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity }}
      />
    </div>

    <div className="container mx-auto relative z-10">
      {/* Creative Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.8, type: "spring" }} 
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-8 relative group" style={{ background: "rgba(155,80,232,0.12)", border: "1px solid rgba(155,80,232,0.3)" }}>
           <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(155,80,232,0.4)" }} />
           <Megaphone className="w-4 h-4 text-emerald-400 relative z-10" strokeWidth={2.5} />
           <span className="text-sm font-bold text-white tracking-wide relative z-10">الحلول التي نقدمها</span>
        </div>
        
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-[1.4] md:leading-[1.3]">
          وش نقدر <span className="text-transparent bg-clip-text inline-block" style={{ backgroundImage: "linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)" }}>نضيف لمشروعك؟</span>
        </h2>
        <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed border-b border-white/5 pb-8 font-medium">
          باقات متكاملة وحلول استراتيجية مصممة خصيصًا لتحقيق النمو الفعلي لعلامتك التجارية — لا وعود فضفاضة، بل نتائج ملموسة.
        </p>
      </motion.div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
        {services.map((s, i) => <ServiceCard key={s.number} service={s} index={i} />)}
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.7, delay: 0.5, type: "spring" }} 
        className="mt-28 text-center"
      >
        <div className="inline-block p-10 rounded-[2.5rem] relative overflow-hidden" style={{ background: "rgba(155,80,232,0.05)", border: "1px solid rgba(155,80,232,0.2)" }}>
           {/* CTA Background Glow */}
           <div className="absolute inset-0 blur-3xl opacity-20" style={{ background: "linear-gradient(135deg, #7c3aed, transparent)" }} />
           
           <h3 className="text-3xl font-black text-white relative z-10 mb-4">مو عارف أي باقة تناسبك وتوصلك لهدفك؟</h3>
           <p className="text-white/60 mb-8 max-w-lg mx-auto relative z-10 text-lg">
             احجز استشارة مجانية الآن وخلنا نحلل وضعك ونختار الخطة الأنسب لمضاعفة أرباحك.
           </p>

           <Link to="/form" onMouseEnter={prefetchForm} className="relative z-10 block">
             <motion.button 
               whileHover={{ scale: 1.05, y: -3 }} 
               whileTap={{ scale: 0.97 }}
               onClick={() => pushGTMEvent("cta_click", { button_name: "استشارة مجانية", location: "services_section" })}
               className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full text-lg font-black text-white shadow-[0_10px_40px_rgba(124,58,237,0.4)] overflow-hidden"
               style={{ background: "linear-gradient(135deg, #7c3aed, #9b50e8)" }}
             >
               <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] ease-in-out" />
               <span className="relative flex items-center gap-3">
                 احجز استشارة مجانية <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
               </span>
             </motion.button>
           </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default memo(ServicesSection);
