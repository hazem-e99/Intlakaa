import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxpaphmltbnangdubutm.supabase.co";
const supabaseAnonKey = "sb_publishable_oOY6rzyvdcFNYqYiyzhpeg_2FViPMYt";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);