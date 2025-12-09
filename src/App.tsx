import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ScrollToTop from "./lib/ScrollToTop";
import { supabase } from "@/lib/supabase";
import { pushGTMEvent } from "./utils/gtm";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Form = lazy(() => import("./pages/Form"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));

// Admin pages
const AdminLayout = lazy(() => import("./layout/AdminLayout").then(m => ({ default: m.AdminLayout })));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Requests = lazy(() => import("./pages/Requests"));
const Settings = lazy(() => import("./pages/Settings"));
const ManageAdmins = lazy(() => import("./pages/ManageAdmins"));

// Protected Route
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Global session check component
const SessionCheck = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    pushGTMEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);

  useEffect(() => {
    // Only check if on admin routes
    if (!location.pathname.startsWith('/admin')) {
      return;
    }

    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only redirect if user is authenticated AND has must_change_password flag
      if (session?.user?.user_metadata?.must_change_password === true) {
        // Only redirect if not already on change-password or login page
        if (location.pathname !== "/admin/change-password" && location.pathname !== "/admin/login") {
          navigate("/admin/change-password");
        }
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Only redirect if user is authenticated AND has must_change_password flag
      if (session?.user?.user_metadata?.must_change_password === true) {
        if (location.pathname !== "/admin/change-password" && location.pathname !== "/admin/login") {
          navigate("/admin/change-password");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <SessionCheck>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/form" element={<Form />} />
              <Route path="/thank-you" element={<ThankYou />} />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<Login />} />

              {/* Admin Change Password Route */}
              <Route path="/admin/change-password" element={<ChangePassword />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="requests" element={<Requests />} />
                <Route path="settings" element={<Settings />} />
                <Route path="manage-admins" element={<ManageAdmins />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SessionCheck>
      </BrowserRouter>
      {/* CTA anchor removed as requested */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
