import { motion } from "framer-motion";
import { IoTrendingUp } from "react-icons/io5";
import { FaUsers, FaShoppingCart, FaBullseye } from "react-icons/fa";

const metrics = [
  { icon: IoTrendingUp, value: "+250%", label: "نمو في المبيعات" },
  { icon: FaUsers, value: "500K+", label: "وصول شهري" },
  { icon: FaShoppingCart, value: "15M+", label: "ريال مبيعات" },
  { icon: FaBullseye, value: "95%", label: "معدل نجاح الحملات" },
];

const ResultsSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            نحب نخلي النتائج تتكلم بدالنا
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            شوف وش سوّت استراتيجياتنا مع عملائنا
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-brand mb-6"
              >
                <metric.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                {metric.value}
              </h3>
              
              <p className="text-lg text-muted-foreground">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 gradient-brand rounded-3xl p-12 text-center"
        >
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            هذي مو بس أرقام... هذي قصص نجاح حقيقية مع عملاء انطلاقة
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
