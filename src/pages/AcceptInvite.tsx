import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, CheckCircle2, XCircle } from "lucide-react";

export default function AcceptInvite() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidInvite, setIsValidInvite] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    // Extract tokens from URL
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const type = searchParams.get("type");
    const expiresIn = searchParams.get("expires_in");

    useEffect(() => {
        // Validate that this is an invite link
        if (type !== "invite") {
            setIsValidInvite(false);
            return;
        }

        if (!accessToken || !refreshToken) {
            setIsValidInvite(false);
            return;
        }

        // Set the session with the tokens from the URL
        const setSession = async () => {
            try {
                const { error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });

                if (error) {
                    console.error("Session error:", error);
                    setIsValidInvite(false);
                    toast({
                        title: "خطأ",
                        description: "رابط الدعوة غير صالح أو منتهي الصلاحية",
                        variant: "destructive",
                    });
                } else {
                    setIsValidInvite(true);
                }
            } catch (error) {
                console.error("Error setting session:", error);
                setIsValidInvite(false);
            }
        };

        setSession();
    }, [accessToken, refreshToken, type, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!password || !confirmPassword) {
            toast({
                title: "خطأ",
                description: "يرجى إدخال كلمة المرور وتأكيدها",
                variant: "destructive",
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: "خطأ",
                description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
                variant: "destructive",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "خطأ",
                description: "كلمات المرور غير متطابقة",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Update the user's password
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) {
                throw error;
            }

            toast({
                title: "تم بنجاح",
                description: "تم تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول",
            });

            // Sign out and redirect to login
            await supabase.auth.signOut();

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate("/admin/login");
            }, 1500);
        } catch (error: any) {
            console.error("Password update error:", error);
            toast({
                title: "خطأ",
                description: error.message || "فشل تعيين كلمة المرور",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading state while validating
    if (isValidInvite === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardContent className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show error if not a valid invite
    if (!isValidInvite) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4" dir="rtl">
                <Card className="w-full max-w-md shadow-lg border-red-200">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                            <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-red-600">رابط غير صالح</CardTitle>
                        <CardDescription>
                            رابط الدعوة غير صالح أو منتهي الصلاحية
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-sm text-muted-foreground mb-4">
                            يرجى التواصل مع المسؤول للحصول على رابط دعوة جديد
                        </p>
                        <Button
                            onClick={() => navigate("/admin/login")}
                            className="w-full"
                            variant="outline"
                        >
                            العودة إلى تسجيل الدخول
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show password form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4" dir="rtl">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">تعيين كلمة المرور</CardTitle>
                    <CardDescription>
                        يرجى إنشاء كلمة مرور قوية لحسابك
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور الجديدة</Label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="pr-10"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                يجب أن تكون 6 أحرف على الأقل
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="pr-10"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                    جاري الحفظ...
                                </>
                            ) : (
                                "تعيين كلمة المرور"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>بعد تعيين كلمة المرور، سيتم توجيهك لتسجيل الدخول</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
