import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Generate video array from 1 to 13
const clientVideos = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `/clients/${i + 1}.mp4`,
}));

const VIDEOS_PER_PAGE = 4;

const ClientsSection = () => {
  const [visibleCount, setVisibleCount] = useState(VIDEOS_PER_PAGE);
  const visibleVideos = clientVideos.slice(0, visibleCount);
  const hasMore = visibleCount < clientVideos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + VIDEOS_PER_PAGE, clientVideos.length));
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.5] max-w-4xl mx-auto">
            آراء عملائنا
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            استمع إلى تجارب عملائنا الحقيقية مع خدماتنا
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {visibleVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-video rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden bg-black">
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  المتصفح لا يدعم تشغيل الفيديو
                </video>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button
              onClick={handleLoadMore}
              size="lg"
              className="px-8 py-6 text-lg"
              variant="outline"
            >
              عرض المزيد
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;

