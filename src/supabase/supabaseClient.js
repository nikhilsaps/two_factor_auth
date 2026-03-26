import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = "https://rnzggbiajzgqqrxcicqh.supabase.co";
const SUPABASE_ANON = "sb_publishable_GMcHefmfXM6ZfmhTSgj7Jw_KpMxkbQv"; // paste from Step 1

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);