import { motion } from "framer-motion";
import { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const Form = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      let entries = Array.from(formData.entries()) as [string, FormDataEntryValue][];

      // Merge phone_code and phone into a single phone value before sending
      const hasPhone = entries.some(([k]) => k === 'phone');
      if (hasPhone) {
        const phoneCode = entries.find(([k]) => k === 'phone_code')?.[1] ?? '';
        const phoneNum = entries.find(([k]) => k === 'phone')?.[1] ?? '';
        const codeStr = String(phoneCode).trim();
        const numStr = String(phoneNum).trim();
        const fullPhone = codeStr ? `${codeStr}${numStr}` : numStr;

        // filter out old phone fields and replace with merged phone
        entries = entries.filter(([k]) => k !== 'phone_code' && k !== 'phone');
        entries.push(['phone', fullPhone]);
      }

      const subject = 'طلب جديد من موقع انطلاقة';

      // Build a readable email body from the form fields
      const bodyLines = entries.map(([key, value]) => {
        const label = key.replace(/_/g, ' ');
        return `${label}: ${String(value)}`;
      });
      const body = bodyLines.join('\n');

      const mailto = `mailto:Osama@intlakaa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open the user's mail client with the prefilled email
      window.location.href = mailto;

      toast({
        title: "تم فتح برنامج البريد",
        description: "اكمل الإرسال من خلال برنامج البريد الخاص بك.",
      });

      // optional: navigate back after a short delay so user sees the toast
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('mailto send failed', err);
      toast({
        title: 'حدث خطأ',
        description: 'تعذر فتح برنامج البريد. جرب استخدام متصفح أو جهاز آخر.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="w-full md:container md:mx-auto md:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            <ArrowRight className="ml-2 w-4 h-4" />
            العودة للرئيسية
          </Button>
          
          <div className="gradient-brand rounded-3xl p-1 shadow-medium">
            <div className="bg-background rounded-3xl p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
                ابدأ رحلتك مع انطلاقة
              </h1>
              <p className="text-lg text-center text-muted-foreground mb-8">
                عبّي البيانات وخلنا نبدأ معك خطوة النمو الحقيقي
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5" action="/api/submit-form" method="POST">
                {/* Hidden field for recipient email (used by proxy) */}
                <input type="hidden" name="to" value="Osama@intlakaa.com" />
                <input type="hidden" name="redirect" value="https://antlaqa.com/thank-you" />
                
                {/* صف واحد للاسم والجوال */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسمك</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="أدخل اسمك الكامل"
                      className="form-input text-right"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم جوالك</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone_code"
                        name="phone_code"
                        type="tel"
                        placeholder="+966"
                        className="form-input text-left w-28"
                        dir="ltr"
                      />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="5XXXXXXXX"
                        className="form-input text-right flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                {/* صف واحد لرابط المتجر */}
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store_url">رابط المتجر</Label>
                    <Input
                      id="store_url"
                      name="store_url"
                      type="text"
                      required
                      placeholder="مثال: اسم المتجر أو رابط الموقع"
                      className="form-input text-right"
                    />
                  </div>
                </div>
                
                {/* الميزانية أُزِيلت — يبقى حقل رابط المتجر الموجود أعلاه مرة واحدة */}
                
                {/* صف واحد للمبيعات (حقل نصي حر) */}
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly_sales">المبيعات الشهرية</Label>
                    <Input
                      id="monthly_sales"
                      name="monthly_sales"
                      type="text"
                      required
                      placeholder="مثال: 50,000 ريال أو وصف المبيعات"
                      className="form-input text-right"
                    />
                  </div>
                </div>
                
                {/* removed optional team/how-found fields as requested */}
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-brand text-white py-5 text-lg font-bold shadow-medium hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال النموذج"}
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Form);
