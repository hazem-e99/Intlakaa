import { motion } from "framer-motion";

const platforms = [
  { name: "منصة سلة", icon: "🛒" },
  { name: "منصة زاد", icon: "📦" },
  { name: "TikTok", icon: "🎵" },
  { name: "Snapchat", icon: "👻" },
  { name: "Meta", icon: "📱" },
];

const PlatformsSection = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">المنصات</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all cursor-pointer"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">{platform.icon}</div>
                <h3 className="text-xl font-bold">{platform.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
