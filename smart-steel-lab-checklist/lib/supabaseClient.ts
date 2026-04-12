import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
export async function logUsage(event: string) {
    try {
        console.log("Logging usage event:", event);
        await supabase.from("SteelLabCheckList_Data").insert({
            project: "smart-steel-lab-checklist",
            event,
        });
    } catch (e) {
        // ignore for now
    }
}
