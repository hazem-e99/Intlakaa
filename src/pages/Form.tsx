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
      const entries = Array.from(formData.entries()) as [string, FormDataEntryValue][];

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
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="5XXXXXXXX"
                        className="form-input text-right flex-1"
                      />
                      <div className="bg-muted px-4 rounded-lg flex items-center">
                        <span className="text-muted-foreground">+966</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* صف واحد للبريد والمسمى الوظيفي */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user_email">البريد الإلكتروني</Label>
                    <Input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      placeholder="example@domain.com"
                      className="form-input text-right"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job_title">المسمى الوظيفي</Label>
                    <Input
                      id="job_title"
                      name="job_title"
                      required
                      placeholder="مثال: مدير تسويق، صاحب متجر"
                      className="form-input text-right"
                    />
                  </div>
                </div>
                
                {/* صف واحد لرابط المتجر والميزانية */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store_url">رابط المتجر (اختياري)</Label>
                    <Input
                      id="store_url"
                      name="store_url"
                      type="url"
                      placeholder="https://example.com"
                      className="form-input text-right"
                      dir="ltr"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthly_budget">الميزانية التسويقية الشهرية</Label>
                    <Select name="monthly_budget" required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الميزانية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5k-10k">5,000 - 10,000 ريال</SelectItem>
                        <SelectItem value="10k-25k">10,000 - 25,000 ريال</SelectItem>
                        <SelectItem value="25k-50k">25,000 - 50,000 ريال</SelectItem>
                        <SelectItem value="50k+">أكثر من 50,000 ريال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* صف واحد للمبيعات وكيف عرفنا */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly_sales">المبيعات الشهرية</Label>
                    <Select name="monthly_sales" required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المبيعات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50k">أقل من 50,000 ريال</SelectItem>
                        <SelectItem value="50k-100k">50,000 - 100,000 ريال</SelectItem>
                        <SelectItem value="100k-500k">100,000 - 500,000 ريال</SelectItem>
                        <SelectItem value="500k+">أكثر من 500,000 ريال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store_age">عمر المتجر</Label>
                    <Select name="store_age" required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر عمر المتجر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">جديد (أقل من 6 أشهر)</SelectItem>
                        <SelectItem value="6-12">من 6 إلى 12 شهر</SelectItem>
                        <SelectItem value="1-2">من سنة إلى سنتين</SelectItem>
                        <SelectItem value="2+">أكثر من سنتين</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* صف واحد للفريق الحالي وكيف عرفنا */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_team">تشتغل مع وكالة أو فريق داخلي</Label>
                    <Select name="current_team" required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوضع الحالي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agency">نعم، مع وكالة</SelectItem>
                        <SelectItem value="internal">نعم، فريق داخلي</SelectItem>
                        <SelectItem value="freelancer">مع مستقلين</SelectItem>
                        <SelectItem value="none">لا، بدون فريق تسويق</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="how_found">كيف عرفت انطلاقة؟</Label>
                    <Select name="how_found" required>
                      <SelectTrigger>
                        <SelectValue placeholder="كيف وصلت إلينا؟" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social">وسائل التواصل</SelectItem>
                        <SelectItem value="referral">ترشيح</SelectItem>
                        <SelectItem value="search">بحث جوجل</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
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
