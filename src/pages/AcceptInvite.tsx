import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function AcceptInvite() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidInvite, setIsValidInvite] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Extract tokens from URL HASH (#)
  const extractHashParams = () => {
    const hash = window.location.hash.substring(1);
    return new URLSearchParams(hash);
  };

  useEffect(() => {
    const params = extractHashParams();
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (type !== "invite" || !accessToken || !refreshToken) {
      setIsValidInvite(false);
      return;
    }

    const setSession = async () => {
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
    };

    setSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast({
        title: "خطأ",
        description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        variant: "destructive",
      });
    }

    if (password !== confirmPassword) {
      return toast({
        title: "خطأ",
        description: "كلمتا المرور غير متطابقتين",
        variant: "destructive",
      });
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "تم بنجاح",
      description: "تم تعيين كلمة المرور. يمكنك الآن تسجيل الدخول",
    });

    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (isValidInvite === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValidInvite) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md shadow-lg border-red-200">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-center text-red-600">
              رابط غير صالح
            </CardTitle>
            <CardDescription className="text-center">
              رابط الدعوة غير صالح أو منتهي الصلاحية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/admin/login")} className="w-full">
              العودة لتسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center">تعيين كلمة المرور</CardTitle>
          <CardDescription className="text-center">
            يرجى إدخال كلمة مرور جديدة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>كلمة المرور</Label>
              <Input
                type="password"
                required
                minLength={6}
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Label>تأكيد كلمة المرور</Label>
              <Input
                type="password"
                required
                minLength={6}
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "جاري الحفظ..." : "تعيين كلمة المرور"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
