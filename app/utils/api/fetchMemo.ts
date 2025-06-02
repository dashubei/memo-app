import { MemoProps } from "@/components/ClientComponent";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const fetchMemo = async (): Promise<MemoProps[] | null> => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: memo } = await supabase.from("memo").select();
  return memo;
};
