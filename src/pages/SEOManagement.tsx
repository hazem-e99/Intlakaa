import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, Share2, Search, BarChart3, Save } from "lucide-react";

export default function SEOManagement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم الحفظ",
        description: "تم تحديث إعدادات SEO بنجاح",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة SEO</h1>
          <p className="text-muted-foreground">
            تحسين ظهور موقعك في محركات البحث ومواقع التواصل الاجتماعي
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="w-fit">
          <Save className="ml-2 h-4 w-4" />
          {isLoading ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>عام</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>التواصل الاجتماعي</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>محركات البحث</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>التحليلات</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات الأساسية</CardTitle>
              <CardDescription>
                الإعدادات العامة لعنوان الموقع والوصف التعريفي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-title">عنوان الموقع (Meta Title)</Label>
                <Input id="site-title" placeholder="مثال: انطلاقة - منصتك للنمو" />
                <p className="text-xs text-muted-foreground">
                  العنوان الذي يظهر في نتائج البحث وأعلى نافذة المتصفح (يفضل أن يكون بين 50-60 حرفاً)
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meta-description">الوصف التعريفي (Meta Description)</Label>
                <Textarea 
                  id="meta-description" 
                  placeholder="اكتب وصفاً مختصراً لموقعك..."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  وصف موجز للمحتوى يظهر في نتائج البحث (يفضل أن يكون بين 150-160 حرفاً)
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="keywords">الكلمات المفتاحية (Keywords)</Label>
                <Input id="keywords" placeholder="تطوير، نمو، انطلاقة، أعمال (افصل بينها بفاصلة)" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>معاينة التواصل الاجتماعي (Open Graph)</CardTitle>
              <CardDescription>
                تحكم في كيفية ظهور موقعك عند مشاركته على فيسبوك، تويتر، وواتساب
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="og-title">عنوان المشاركة</Label>
                <Input id="og-title" placeholder="عنوان جذاب للمشاركة" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="og-description">وصف المشاركة</Label>
                <Textarea id="og-description" placeholder="وصف مخصص لمواقع التواصل الاجتماعي" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="og-image">رابط صورة المعاينة</Label>
                <div className="flex gap-2">
                  <Input id="og-image" placeholder="https://example.com/og-image.jpg" />
                  <Button variant="outline">رفع صورة</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  أبعاد الصورة الموصى بها هي 1200×630 بكسل
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أدوات مشرفي المواقع</CardTitle>
              <CardDescription>
                ربط الموقع مع أدوات محركات البحث المختلفة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="google-console">رمز التحقق من Google Search Console</Label>
                <Input id="google-console" placeholder="رمز التحقق (Meta Tag Content)" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="robots-txt">ملف Robots.txt</Label>
                <Textarea 
                  id="robots-txt" 
                  placeholder="User-agent: *
Allow: /" 
                  className="font-mono text-sm min-h-[120px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sitemap">رابط ملف السايت ماب (Sitemap URL)</Label>
                <Input id="sitemap" placeholder="https://example.com/sitemap.xml" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أكواد التتبع والتحليل</CardTitle>
              <CardDescription>
                إضافة أكواد التتبع لمراقبة أداء الموقع وحملات التسويق
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                <Input id="gtm-id" placeholder="GTM-XXXXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ga-id">Google Analytics ID (GA4)</Label>
                <Input id="ga-id" placeholder="G-XXXXXXXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                <Input id="fb-pixel" placeholder="أدخل معرف بكسل فيسبوك" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tiktok-pixel">TikTok Pixel ID</Label>
                <Input id="tiktok-pixel" placeholder="أدخل معرف بكسل تيك توك" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
