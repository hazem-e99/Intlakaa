import { motion } from "framer-motion";
import { memo } from "react";
import SafariVideo from "./ui/safari-video";

const videos = [
  { id: 1, title: "حملة إعلانية ناجحة", src: "/v5.mp4" },
  { id: 2, title: "نمو مبيعات متجر", src: "/v2.mp4" },
  { id: 3, title: "استراتيجية محتوى", src: "/v3.mp4" },
  { id: 4, title: "تحسين معدل التحويل", src: "/v1.mp4" },
  { id: 5, title: "إدارة حملات سناب", src: "/v4.mp4" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.5] max-w-4xl mx-auto">
            هدفنا مو بس نسوّي حملات… نسوّي حملات تنذكر كـ Case Study
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="video-card aspect-video rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden bg-black">
                <SafariVideo
                  src={video.src}
                  controls
                  className="w-full h-full object-cover bg-black block relative z-10"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(CaseStudySection);
