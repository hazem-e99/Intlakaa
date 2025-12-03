import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const SERVICE_ROLE_KEY = Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cGFwaG1sdGJuYW5nZHVidXRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDc1NzYwNCwiZXhwIjoyMDgwMzMzNjA0fQ.jeIdCDlJMO865do74ny-MReMZl8QJKVa2x5VSPiN4zA");
  const SUPABASE_URL = Deno.env.get("https://sxpaphmltbnangdubutm.supabase.co");

  if (!SERVICE_ROLE_KEY || !SUPABASE_URL) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // =========================================================
  // 1- LIST USERS
  // =========================================================
  if (req.method === "GET" && action === "list") {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) return new Response(JSON.stringify(error), { status: 400 });

    return new Response(JSON.stringify({ users: data.users }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // =========================================================
  // 2- INVITE USER
  // =========================================================
  if (req.method === "POST" && action === "invite") {
    const { email, redirectTo } = await req.json();

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo,
    });

    if (error) return new Response(JSON.stringify(error), { status: 400 });

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // =========================================================
  // 3- DELETE USER
  // =========================================================
  if (req.method === "DELETE" && action === "delete") {
    const { userId } = await req.json();

    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) return new Response(JSON.stringify(error), { status: 400 });

    return new Response(JSON.stringify({ success: true }));
  }

  // =========================================================
  // DEFAULT
  // =========================================================
  return new Response(JSON.stringify({ error: "Invalid route" }), { status: 400 });
});
