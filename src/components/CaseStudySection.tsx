import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const videos = [
  { id: 1, title: "حملة إعلانية ناجحة" },
  { id: 2, title: "نمو مبيعات متجر" },
  { id: 3, title: "استراتيجية محتوى" },
  { id: 4, title: "تحسين معدل التحويل" },
  { id: 5, title: "إدارة حملات سناب" },
  { id: 6, title: "نجاح على تيك توك" },
];

const CaseStudySection = () => {
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
            هدفنا مو بس نسوّي حملات… نسوّي حملات تنذكر كـ Case Study
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-soft hover:shadow-medium transition-all overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-6"
                  >
                    <FaPlay className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-4 text-center">{video.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
