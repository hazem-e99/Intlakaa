import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, Share2, Search, BarChart3, Save, Loader2 } from "lucide-react";
import { fetchSeoSettings, saveSeoSettings, type SeoSettings } from "@/services/seoService";

const defaultSeo: SeoSettings = {
    siteTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    googleConsole: "",
    robotsTxt: "",
    sitemap: "",
    gtmId: "",
    gaId: "",
    fbPixel: "",
    tiktokPixel: "",
};

export default function SEOManagement() {
    const { toast } = useToast();

    const [seo, setSeo] = useState<SeoSettings>(defaultSeo);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // ── Load current settings from the backend on mount ──────────────────────
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchSeoSettings();
                setSeo(data);
            } catch (err) {
                console.error("SEO fetch error:", err);
                toast({
                    title: "خطأ في تحميل الإعدادات",
                    description: "تعذّر جلب إعدادات SEO من الخادم",
                    variant: "destructive",
                });
            } finally {
                setIsFetching(false);
            }
        };
        load();
    }, []);

    const handleChange = (field: keyof SeoSettings) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSeo((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // ── Save to backend + auto-update index.html ──────────────────────────────
    const handleSave = async () => {
        setIsLoading(true);
        try {
            const updated = await saveSeoSettings(seo);
            setSeo(updated);
            toast({
                title: "✅ تم الحفظ",
                description: "تم تحديث إعدادات SEO وتطبيقها على الموقع بنجاح",
            });
        } catch (err) {
            console.error("SEO save error:", err);
            toast({
                title: "خطأ في الحفظ",
                description: "تعذّر حفظ إعدادات SEO. يرجى المحاولة مجدداً.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]" dir="rtl">
                <div className="text-center space-y-3">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">جاري تحميل إعدادات SEO...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">إدارة SEO</h1>
                    <p className="text-muted-foreground">
                        تحسين ظهور موقعك في محركات البحث ومواقع التواصل الاجتماعي
                    </p>
                </div>
                <Button onClick={handleSave} disabled={isLoading} className="w-fit gap-2">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {isLoading ? "جاري الحفظ..." : "حفظ وتطبيق على الموقع"}
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full" dir="rtl">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
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

                {/* ─── General ─── */}
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader className="text-right">
                            <CardTitle>الإعدادات الأساسية</CardTitle>
                            <CardDescription>العنوان والوصف التعريفي الذي يظهر في نتائج جوجل</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 text-right">
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                        {seo.siteTitle.length} / 60 حرف
                                    </span>
                                    <Label htmlFor="site-title">عنوان الموقع (Meta Title)</Label>
                                </div>
                                <Input
                                    id="site-title"
                                    value={seo.siteTitle}
                                    onChange={handleChange("siteTitle")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                        {seo.metaDescription.length} / 160 حرف
                                    </span>
                                    <Label htmlFor="meta-description">الوصف التعريفي (Meta Description)</Label>
                                </div>
                                <Textarea
                                    id="meta-description"
                                    value={seo.metaDescription}
                                    onChange={handleChange("metaDescription")}
                                    className="min-h-[100px]"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="keywords">الكلمات المفتاحية (Keywords)</Label>
                                <Input
                                    id="keywords"
                                    value={seo.keywords}
                                    onChange={handleChange("keywords")}
                                    placeholder="افصل الكلمات بفاصلة: تسويق, نمو, انطلاقة"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ─── Social ─── */}
                <TabsContent value="social" className="space-y-4">
                    <Card>
                        <CardHeader className="text-right">
                            <CardTitle>معاينة التواصل الاجتماعي (Open Graph)</CardTitle>
                            <CardDescription>
                                تحكم في كيفية ظهور الموقع عند مشاركته على فيسبوك وواتساب وتويتر
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 text-right">
                            <div className="grid gap-2">
                                <Label htmlFor="og-title">عنوان المشاركة</Label>
                                <Input
                                    id="og-title"
                                    value={seo.ogTitle}
                                    onChange={handleChange("ogTitle")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="og-description">وصف المشاركة</Label>
                                <Textarea
                                    id="og-description"
                                    value={seo.ogDescription}
                                    onChange={handleChange("ogDescription")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="og-image">رابط صورة المعاينة</Label>
                                <Input
                                    id="og-image"
                                    value={seo.ogImage}
                                    onChange={handleChange("ogImage")}
                                    placeholder="https://example.com/og-image.jpg  أو  /logo.png"
                                />
                                <p className="text-xs text-muted-foreground">
                                    أبعاد الصورة الموصى بها: 1200 × 630 بكسل
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ─── Search ─── */}
                <TabsContent value="search" className="space-y-4">
                    <Card>
                        <CardHeader className="text-right">
                            <CardTitle>أدوات مشرفي المواقع</CardTitle>
                            <CardDescription>ربط الموقع بأدوات محركات البحث</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 text-right">
                            <div className="grid gap-2">
                                <Label htmlFor="google-console">رمز التحقق من Google Search Console</Label>
                                <Input
                                    id="google-console"
                                    value={seo.googleConsole}
                                    onChange={handleChange("googleConsole")}
                                    placeholder="رمز التحقق (Meta Tag Content)"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="robots-txt">ملف Robots.txt</Label>
                                <Textarea
                                    id="robots-txt"
                                    value={seo.robotsTxt}
                                    onChange={handleChange("robotsTxt")}
                                    className="font-mono text-sm min-h-[120px]"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sitemap">رابط ملف السايت ماب (Sitemap URL)</Label>
                                <Input
                                    id="sitemap"
                                    value={seo.sitemap}
                                    onChange={handleChange("sitemap")}
                                    placeholder="https://example.com/sitemap.xml"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ─── Analytics ─── */}
                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader className="text-right">
                            <CardTitle>أكواد التتبع والتحليل</CardTitle>
                            <CardDescription>
                                كل كود تضيفه هنا سيُضاف تلقائياً إلى{'<head>'} الموقع عند الحفظ
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 text-right">
                            <div className="grid gap-2">
                                <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                                <Input
                                    id="gtm-id"
                                    value={seo.gtmId}
                                    onChange={handleChange("gtmId")}
                                    placeholder="GTM-XXXXXXX أو AW-XXXXXXXXX"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ga-id">Google Analytics ID (GA4)</Label>
                                <Input
                                    id="ga-id"
                                    value={seo.gaId}
                                    onChange={handleChange("gaId")}
                                    placeholder="G-XXXXXXXXXX"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                                <Input
                                    id="fb-pixel"
                                    value={seo.fbPixel}
                                    onChange={handleChange("fbPixel")}
                                    placeholder="أدخل معرف بكسل فيسبوك"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tiktok-pixel">TikTok Pixel ID</Label>
                                <Input
                                    id="tiktok-pixel"
                                    value={seo.tiktokPixel}
                                    onChange={handleChange("tiktokPixel")}
                                    placeholder="أدخل معرف بكسل تيك توك"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
