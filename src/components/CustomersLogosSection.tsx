import { motion } from "framer-motion";

// Customer logos - 11 logos
const customerLogos = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    src: `/Customerslogos/l${i + 1}.png`,
    alt: `عميل ${i + 1}`,
}));

// Duplicate for seamless infinite scroll
const duplicatedLogos = [...customerLogos, ...customerLogos];

const CustomersLogosSection = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
            <div className="container mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-secondary/10 text-secondary mb-4">
                        شركاء النجاح
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.5]">
                        <span className="text-gradient">عملاؤنا</span> ثقتنا
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        فخورون بالعمل مع أفضل العلامات التجارية والشركات الرائدة
                    </p>
                </motion.div>

                {/* Logos Marquee Container */}
                <div className="relative">
                    {/* Gradient Fade Left */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Gradient Fade Right */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* First Row - Right to Left */}
                    <div className="mb-8 overflow-hidden">
                        <motion.div
                            className="flex gap-8 items-center"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {duplicatedLogos.map((logo, index) => (
                                <div
                                    key={`row1-${logo.id}-${index}`}
                                    className="flex-shrink-0 group"
                                >
                                    <div className="relative w-32 h-20 md:w-44 md:h-28 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-border/50 p-4 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-glow hover:border-secondary/50 hover:bg-white dark:hover:bg-white/20">
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            loading="lazy"
                                            className="max-w-full max-h-full object-contain transition-all duration-500"
                                        />
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Second Row - Left to Right (Reverse Direction) */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-8 items-center"
                            animate={{
                                x: ["-50%", "0%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 35,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...duplicatedLogos].reverse().map((logo, index) => (
                                <div
                                    key={`row2-${logo.id}-${index}`}
                                    className="flex-shrink-0 group"
                                >
                                    <div className="relative w-32 h-20 md:w-44 md:h-28 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-border/50 p-4 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-glow hover:border-secondary/50 hover:bg-white dark:hover:bg-white/20">
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            loading="lazy"
                                            className="max-w-full max-h-full object-contain transition-all duration-500"
                                        />
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomersLogosSection;
