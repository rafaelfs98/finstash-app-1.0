import { createClient } from "@supabase/supabase-js";
import { Database } from "../Types/supabase";

const supabaseUrl = "https://kuxsijjuarhzpnbttzpk.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eHNpamp1YXJoenBuYnR0enBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyODAzMjUsImV4cCI6MjAxNjg1NjMyNX0.sIHKQW8BJSMdKbh8j8SAsyf2fiFh7wzLgnXKPsS2Kng";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
