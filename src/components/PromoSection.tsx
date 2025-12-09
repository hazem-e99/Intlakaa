import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import prefetchForm from "@/lib/prefetchForm";
import { memo } from "react";
import { pushGTMEvent } from "@/utils/gtm";

const PromoSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-brand rounded-3xl p-12 md:p-16 text-center shadow-medium"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            عَبّي النموذج وخلنا نطلق متجرك سوا
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            خطوة واحدة تفصلك عن النمو الحقيقي. شاركنا بياناتك وخل فريقنا يبدأ معك الرحلة
          </p>

          <Link to="/form" onMouseEnter={prefetchForm} onFocus={prefetchForm} onTouchStart={prefetchForm}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => pushGTMEvent('cta_click', { button_name: 'احجز استشارتك المجانية', location: 'promo_section' })}
              className="bg-white text-primary px-12 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              احجز استشارتك المجانية
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(PromoSection);
