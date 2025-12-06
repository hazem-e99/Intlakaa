import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (newPassword.length < 6) {
            toast({
                title: "خطأ",
                description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
                variant: "destructive",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast({
                title: "خطأ",
                description: "كلمتا المرور غير متطابقتين",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Update password
            const { error: passwordError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (passwordError) {
                throw passwordError;
            }

            // Remove must_change_password flag
            const { error: metadataError } = await supabase.auth.updateUser({
                data: { must_change_password: false },
            });

            if (metadataError) {
                throw metadataError;
            }

            toast({
                title: "تم بنجاح",
                description: "تم تحديث كلمة المرور بنجاح",
            });

            // Sign out and redirect to login
            await supabase.auth.signOut();
            navigate("/admin/login");
        } catch (error: any) {
            console.error("Password change error:", error);
            toast({
                title: "خطأ",
                description: error.message || "حدث خطأ أثناء تحديث كلمة المرور",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4" dir="rtl">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">تغيير كلمة المرور</CardTitle>
                    <CardDescription>
                        يرجى إدخال كلمة مرور جديدة وآمنة
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="pr-10"
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                />
                            </div>
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
                                    autoComplete="new-password"
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
                                    جاري التحديث...
                                </>
                            ) : (
                                "تحديث كلمة المرور"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>بعد تحديث كلمة المرور، سيتم تسجيل خروجك تلقائياً</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
