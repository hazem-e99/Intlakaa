import { motion } from "framer-motion";

// Customer logos - 22 logos
const customerLogos = [
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183986/moaSasA_jx3l7q.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183985/benRadyjpg_k4spbp.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183790/WishFormula_a2uhp5.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183790/Tammor_ekozvf.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183787/Saad_fn5euv.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183787/samTickets_eg0jln.webp",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183786/l6_bif8bd.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183785/LaForme_egaz9x.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183786/Lord_ub3kyr.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183784/l10_kirxkh.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183784/l11_z0f0yr.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183783/l8_wxggyq.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183783/l9_tunpxm.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183781/l5_dkzgvx.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183782/l7_f8ru6p.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183780/Arslaaan_wz0yt5.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183780/l3_cmf2f7.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183780/l4_ybiyri.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183779/l1_nq3gmp.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183779/ElMataeeb_jmnz5v.svg",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183779/Eklil_l2el20.png",
    "https://res.cloudinary.com/dvgi2kkpy/image/upload/v1773183779/l2_rpxeyy.png"
].map((src, i) => ({
    id: i + 1,
    src: src,
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.5]">
                        نفتخر بثقة أكثر من <span className="text-gradient">علامة تجارية</span>
                    </h2>
                </motion.div>

                {/* Logos Marquee Container */}
                <div className="relative">
                    {/* Gradient Fade Left */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Gradient Fade Right */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

                    {/* Single Row - Seamless Loop (Forced LTR for robust animation) */}
                    <div className="overflow-hidden" dir="ltr">
                        <motion.div
                            className="flex gap-8 items-center py-4 w-max"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 40,
                                    ease: "linear",
                                },
                            }}
                        >
                            {duplicatedLogos.map((logo, index) => (
                                <div
                                    key={`logo-${logo.id}-${index}`}
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
