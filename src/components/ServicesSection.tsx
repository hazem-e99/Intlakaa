import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { memo } from "react";

const services = [
  {
    id: "1",
    title: "باقة المحتوي والاعلان",
    number: "1",
    items: [
      "نخطط لحملاتك التسويقية بخطط مدروسة تناسب براندك.",
      "نكتب ونبني خطة محتوى توصّل رسالتك للجمهور بطريقة جذّابة.",
      "نجهّز سكربتات ومونتاج فيديوهات تبرز هويّة مشروعك.",
      "نصمّم صفحات هبوط احترافية تزيد التحويلات وتخلّي الإعلان يجيب نتيجة.",
      "نعدّ خطة إعلانات مع CRO نتابع الأداء ونحسّن النتائج خطوة بخطوة.",
      "ندير صفحاتك عشان تبقى دايم حاضرة ومتفاعلة مع جمهورك.",
      "نوفّر لك مدير يكون معك خطوة بخطوة، من إطلاق الحملة إلى النتائج.",
    ],
  },
  {
    id: "2",
    title: "باقة الاعلانات",
    number: "2",
    items: [
      "نجهّز الإعلانات ونطلقها بالطريقة الصح.",
      "نوجّهك بالفيديوهات المطلوبة للحملات الاعلانية",
      "نتابع أداء الحملات أول بأول ونعدّلها إذا احتاجت تحسين.",
      "نعطيك تقارير واضحة توريك وش اللي يجيب نتيجة فعلية.",
    ],
  },
  {
    id: "3",
    title: "الاستشارات",
    number: "3",
    items: [
      "استشارتنا تختصر عليك الوقت والمال وتوفّر عليك خسارة التجارب",
      "كأنك تسأل أحد جرّب الطريق قبلك، وعارف وش اللي يشتغل وش اللي لا.",
      "خبراء شغّالين فعليًا على متاجر تحقق من آلاف إلى ملايين شهريًا مع انطلاقه!",
    ],
  },
  {
    id: "4",
    title: "البحث والتحليل",
    number: "4",
    items: [
      "في انطلاقة، نسوي البحث والتحليل بأسرع وقت وبأعلى معايير عالمية",
      "نشتغل بدقّة على كل التفاصيل اللي تأثر في نجاح حملتك، ونرتّب النتائج بطريقة تخليك تشوف الصورة كاملة وتستفيد منها بسهولة",
      "لأن هدفنا مو بس نعرف الأرقام، هدفنا نضاعفها",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            وش نقدر نضيف لمشروعك !
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-soft hover:shadow-medium transition-all border-none overflow-hidden text-white"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline group">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-1 flex items-center gap-3 justify-start">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{service.number}</span>
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold transition-colors text-right text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <ul className="space-y-4 mr-14">
                    {service.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="flex items-start gap-3 text-xl md:text-2xl text-white text-right"
                      >
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-white mt-2"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ServicesSection);
