import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, Share2, Search, BarChart3, Save, Loader2, RefreshCw } from "lucide-react";
import { fetchSeoSettings, saveSeoSettings, syncSeoFromHtml, type SeoSettings } from "@/services/seoService";

const defaultSeo: SeoSettings = {
    siteTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
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
    const [isSyncing, setIsSyncing] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    // ── Load current settings from the backend on mount ──────────────────────
    useEffect(() => {
        const load = async () => {
            console.log('[SEO Page] 🚀 Component mounted — loading settings...');
            try {
                const data = await fetchSeoSettings();
                setSeo(data);
                setFetchError(false);
                console.log('[SEO Page] ✅ State updated with fetched data:', data);
            } catch (err) {
                console.error('[SEO Page] ❌ Failed to load settings:', err);
                setFetchError(true);
                toast({
                    title: "خطأ في تحميل الإعدادات",
                    description: "تعذّر جلب إعدادات SEO من الخادم",
                    variant: "destructive",
                });
            } finally {
                setIsFetching(false);
                console.log('[SEO Page] 🏁 Fetch sequence complete.');
            }
        };
        load();
    }, []);

    const handleChange = (field: keyof SeoSettings) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newValue = e.target.value;
        console.log(`[SEO Page] ✏️ Field changed: ${field} =`, newValue);
        setSeo((prev) => ({ ...prev, [field]: newValue }));
    };

    // ── Sync from index.html (overwrite DB with HTML values) ───────────────────
    const handleSync = async () => {
        console.log('[SEO Page] 🔁 Sync button clicked...');
        setIsSyncing(true);
        try {
            const updated = await syncSeoFromHtml();
            setSeo(updated);
            console.log('[SEO Page] ✅ Sync complete — state updated:', updated);
            toast({
                title: "✅ تمت المزامنة",
                description: "تم استيراد جميع الإعدادات من ملف index.html بنجاح",
            });
        } catch (err) {
            console.error('[SEO Page] ❌ Sync failed:', err);
            toast({
                title: "خطأ في المزامنة",
                description: "تعذّر مزامنة الإعدادات من ملف index.html",
                variant: "destructive",
            });
        } finally {
            setIsSyncing(false);
        }
    };

    // ── Save to backend + auto-update index.html ──────────────────────────────
    const handleSave = async () => {
        console.log('[SEO Page] 💾 Save button clicked — current state:', seo);
        setIsLoading(true);
        try {
            const updated = await saveSeoSettings(seo);
            setSeo(updated);
            console.log('[SEO Page] ✅ Save complete — state updated:', updated);
            toast({
                title: "✅ تم الحفظ",
                description: "تم تحديث إعدادات SEO وتطبيقها على الموقع بنجاح",
            });
        } catch (err) {
            console.error('[SEO Page] ❌ Save failed:', err);
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

    if (fetchError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]" dir="rtl">
                <div className="text-center space-y-4">
                    <div className="text-destructive text-5xl">⚠️</div>
                    <h2 className="text-xl font-semibold">تعذّر الاتصال بالخادم</h2>
                    <p className="text-muted-foreground max-w-sm">
                        تأكد أن الباك إند شغال وأن الاتصال بقاعدة البيانات سليم، ثم أعد تحميل الصفحة.
                    </p>
                    <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        إعادة المحاولة
                    </Button>
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
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={handleSync}
                        disabled={isSyncing || isLoading}
                        title="استيراد القيم الحالية من ملف index.html إلى قاعدة البيانات"
                        className="w-fit gap-2"
                    >
                        {isSyncing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="h-4 w-4" />
                        )}
                        {isSyncing ? "جاري المزامنة..." : "مزامنة من الموقع"}
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading || isSyncing} className="w-fit gap-2">
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isLoading ? "جاري الحفظ..." : "حفظ وتطبيق على الموقع"}
                    </Button>
                </div>
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
                                    placeholder="https://intlakaa.com/og-image.jpg  أو  /logo.png"
                                />
                                <p className="text-xs text-muted-foreground">
                                    أبعاد الصورة الموصى بها: 1200 × 630 بكسل
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="og-url">رابط الموقع (og:url)</Label>
                                <Input
                                    id="og-url"
                                    value={seo.ogUrl}
                                    onChange={handleChange("ogUrl")}
                                    placeholder="https://intlakaa.com"
                                />
                                <p className="text-xs text-muted-foreground">
                                    الرابط الأساسي للموقع — مهم لمشاركات فيسبوك وتويتر
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
                                    className="font-mono text-sm min-h-[120px] text-left ltr"
                                    dir="ltr"
                                />
                                <p className="text-xs text-muted-foreground">
                                    هذا المحتوى سيكون متاحاً لمحركات البحث مباشرةً على رابط <code className="bg-muted px-1 rounded text-xs">/robots.txt</code>
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sitemap">رابط ملف السايت ماب (Sitemap URL)</Label>
                                <Input
                                    id="sitemap"
                                    value={seo.sitemap}
                                    onChange={handleChange("sitemap")}
                                    placeholder="https://intlakaa.com/sitemap.xml"
                                    className="text-left ltr"
                                    dir="ltr"
                                />
                                <p className="text-xs text-muted-foreground">
                                    سيُضاف الرابط تلقائياً داخل ملف <code className="bg-muted px-1 rounded text-xs">robots.txt</code> لإخبار محركات البحث بمكانه
                                </p>
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
                                أدخل الـ ID فقط — الكود الكامل بيتولّد تلقائياً ويُضاف لـ{'<head>'} و{'<body>'} الموقع عند الحفظ
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 text-right">
                            <div className="grid gap-2">
                                <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                                <Input
                                    id="gtm-id"
                                    value={seo.gtmId}
                                    onChange={handleChange("gtmId")}
                                    placeholder="GTM-KNL4FLN8"
                                />
                                <p className="text-xs text-muted-foreground">
                                    بيولّد كود GTM الكامل في الـ {'<head>'} + {'<noscript>'} في الـ {'<body>'}
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ga-id">Google Analytics ID (GA4)</Label>
                                <Input
                                    id="ga-id"
                                    value={seo.gaId}
                                    onChange={handleChange("gaId")}
                                    placeholder="G-G676SW318K"
                                />
                                <p className="text-xs text-muted-foreground">
                                    استخدمه لو مش شغّال GTM — لو GTM موجود هو اللي بيدير GA4
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="google-console-search">Google Search Console</Label>
                                <Input
                                    id="google-console-search"
                                    value={seo.googleConsole}
                                    onChange={handleChange("googleConsole")}
                                    placeholder="YZbIykBhCX6tmf5srmI1PqKpLXGVuuzQbGpBjh4MBOA"
                                />
                                <p className="text-xs text-muted-foreground">
                                    أدخل قيمة الـ <code className="bg-muted px-1 rounded text-xs">content</code> فقط من تاق التحقق
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                                <Input
                                    id="fb-pixel"
                                    value={seo.fbPixel}
                                    onChange={handleChange("fbPixel")}
                                    placeholder="مثال: 123456789012345"
                                />
                                <p className="text-xs text-muted-foreground">
                                    أدخل الـ ID الخاص بالبيكسل (أرقام فقط)
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tiktok-pixel">TikTok Pixel ID</Label>
                                <Input
                                    id="tiktok-pixel"
                                    value={seo.tiktokPixel}
                                    onChange={handleChange("tiktokPixel")}
                                    placeholder="مثال: D6A307JC77U2V3Q5JGF0"
                                />
                                <p className="text-xs text-muted-foreground">
                                    أدخل الـ ID فقط (أحرف وأرقام) — السكريبت الكامل لـ TikTok يتولد تلقائياً
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
