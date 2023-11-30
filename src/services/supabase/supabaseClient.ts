import { createClient } from "@supabase/supabase-js";
import { Database } from "../Types/supabase";

const supabaseUrl = "https://senbcwzimnbyqbwsfect.supabase.co";

const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
