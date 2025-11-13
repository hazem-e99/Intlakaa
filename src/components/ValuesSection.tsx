import { motion } from "framer-motion";
import { FaUsers, FaBullseye, FaBookOpen } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const values = [
  {
    icon: HiSparkles,
    text: "ودّع الحملات العشوائية ما توصلك بعيد، ومع انطلاقة تختصر وقت نموك مع أفضل الاستراتيجيات في المجال، مصممة خصيصًا على احتياجك وهدفك.",
  },
  {
    icon: FaUsers,
    title: "خبراء نمو فعليين",
    text: "بخبرة متراكمة تجاوزت مئات الملايين من المبيعات، نشتغل على كل مراحل النمو: من التأسيس المتين إلى التصعيد",
  },
  {
    icon: FaBullseye,
    title: "عملاء محدودين، تركيز عالي",
    text: "سياستنا نخدم عدد محدود جدًا من العملاء شهريًا، عشان نعطي كل عميل أعلى تركيز ونتائج فعليّة",
  },
  {
    icon: HiSparkles,
    title: "فريق عالمي المستوى",
    text: "أكثر من 25 استراتيجي تسويق، ومدراء حملات إعلانية (Performance Marketers)، ومخرجين إبداعيين وكتاب بيع مباشر، على مستويات عالمية",
  },
  {
    icon: FaBookOpen,
    title: "نستثمر في العقول قبل الأدوات",
    text: "أكبر استثمارنا هو الفريق والتعلم من أساطير التسويق حول العالم، ندرس الأفضل… عشان نكون الأفضل دائمًا",
  },
];

const ValuesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-[1.5]">
            انطلاقة | لأن النمو ما يصير صدفة
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all"
            >
              <div className="flex gap-6 items-start">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-14 h-14 rounded-full gradient-brand flex items-center justify-center"
                >
                  <value.icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <div className="text-right flex-1">
                  {value.title && (
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  )}
                  <p className="text-lg text-muted-foreground leading-[2]">
                    {value.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
