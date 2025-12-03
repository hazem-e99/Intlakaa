import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

  if (!SERVICE_ROLE_KEY || !SUPABASE_URL) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // =========================================================
  // 1- LIST USERS
  // =========================================================
  if (req.method === "GET" && action === "list") {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      return new Response(JSON.stringify(error), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ users: data.users }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
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

    if (error) {
      return new Response(JSON.stringify(error), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // =========================================================
  // 3- DELETE USER
  // =========================================================
  if (req.method === "DELETE" && action === "delete") {
    const { userId } = await req.json();

    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return new Response(JSON.stringify(error), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // =========================================================
  // DEFAULT
  // =========================================================
  return new Response(JSON.stringify({ error: "Invalid route" }), { 
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
