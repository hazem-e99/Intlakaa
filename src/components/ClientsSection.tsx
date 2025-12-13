import { motion } from "framer-motion";

// List of available video IDs based on actual files
const clientVideos = [1, 2, 3, 4, 6,7, 13].map((id) => ({
  id,
  src: `/clients/${id}.mp4`,
}));

const ClientsSection = () => {
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="video-card aspect-video rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden bg-black">
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover bg-black block relative z-10"
                >
                  المتصفح لا يدعم تشغيل الفيديو
                </video>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

