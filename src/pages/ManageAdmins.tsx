import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, UserPlus, Mail } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminUser {
    id: string;
    email?: string;
    created_at: string;
    last_sign_in_at?: string;
}

// Get the Edge Function URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/admin-users`;

export default function ManageAdmins() {
    const [email, setEmail] = useState("");
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Fetch all admin users via Edge Function
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useQuery<AdminUser[]>({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                throw new Error("Not authenticated");
            }

            const response = await fetch(`${EDGE_FUNCTION_URL}?action=list`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to fetch users");
            }

            const data = await response.json();
            return data.users || [];
        },
        staleTime: 30000,
    });

    // Invite user mutation via Edge Function
    const inviteMutation = useMutation({
        mutationFn: async (inviteEmail: string) => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                throw new Error("Not authenticated");
            }

            const response = await fetch(`${EDGE_FUNCTION_URL}?action=invite`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inviteEmail,
                    redirectTo: `${import.meta.env.VITE_SITE_URL}/admin/login`,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to invite user");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast({
                title: "تم إرسال الدعوة بنجاح",
                description: "تم إرسال رسالة الدعوة إلى البريد الإلكتروني",
            });
            setEmail("");
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        },
        onError: (error: Error) => {
            toast({
                title: "فشل إرسال الدعوة",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // Delete user mutation via Edge Function
    const deleteMutation = useMutation({
        mutationFn: async (userId: string) => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                throw new Error("Not authenticated");
            }

            const response = await fetch(`${EDGE_FUNCTION_URL}?action=delete`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to delete user");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast({
                title: "تم حذف المستخدم",
                description: "تم حذف المستخدم بنجاح",
            });
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        },
        onError: (error: Error) => {
            toast({
                title: "فشل حذف المستخدم",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast({
                title: "خطأ",
                description: "يرجى إدخال البريد الإلكتروني",
                variant: "destructive",
            });
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({
                title: "خطأ",
                description: "يرجى إدخال بريد إلكتروني صحيح",
                variant: "destructive",
            });
            return;
        }

        inviteMutation.mutate(email);
    };

    const handleDelete = (userId: string) => {
        deleteMutation.mutate(userId);
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">إدارة الأدمنز</h1>
                <p className="text-muted-foreground">
                    إضافة وإدارة مستخدمي لوحة التحكم
                </p>
            </div>

            {/* Invite Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        دعوة أدمن جديد
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleInvite} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={inviteMutation.isPending}
                                        className="pr-9"
                                        dir="ltr"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={inviteMutation.isPending}
                                    className="gap-2"
                                >
                                    {inviteMutation.isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            جاري الإرسال...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="h-4 w-4" />
                                            إرسال الدعوة
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                سيتم إرسال رسالة دعوة إلى البريد الإلكتروني المدخل
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>قائمة المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {/* Error State */}
                    {isError && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                            <p className="font-medium">خطأ في تحميل المستخدمين</p>
                            <p className="text-sm">{(error as Error).message}</p>
                        </div>
                    )}

                    {/* Table */}
                    {!isLoading && !isError && (
                        <>
                            {users && users.length > 0 ? (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-right">
                                                    البريد الإلكتروني
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    تاريخ الإنشاء
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    آخر تسجيل دخول
                                                </TableHead>
                                                <TableHead className="text-right w-24">
                                                    الإجراءات
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium" dir="ltr">
                                                        {user.email || "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatDate(user.created_at)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.last_sign_in_at
                                                            ? formatDate(user.last_sign_in_at)
                                                            : "لم يسجل دخول بعد"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                    disabled={deleteMutation.isPending}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        هل أنت متأكد؟
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        سيتم حذف المستخدم{" "}
                                                                        <span className="font-semibold">
                                                                            {user.email}
                                                                        </span>{" "}
                                                                        نهائياً. لا يمكن التراجع عن هذا الإجراء.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(user.id)}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        حذف
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="rounded-md border border-dashed p-12 text-center">
                                    <p className="text-muted-foreground">
                                        لا يوجد مستخدمون حالياً
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
