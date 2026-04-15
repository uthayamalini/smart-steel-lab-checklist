// \\app\api\api - ai - prompt\route.ts
import { NextRequest, NextResponse } from "next/server";
import { runAI } from "@/lib/ai/aiClient";
import { chooseModel } from "@/lib/ai/modelRouter";

export async function POST(req: NextRequest) {
    try {
        const { question, context } = await req.json();
        const task: "test_plan" | "quick_explain" | "compliance" = "compliance";

        const model = chooseModel(task);

        const system = "You are a standards-compliant steel testing AI.";

        const prompt =
            `CONTEXT (EN/ASTM/JIS/GB/GOST/AS/NZS standards data):
            ${JSON.stringify(context, null, 2)}

            QUESTION:
            ${question}

            RULES:
            - Use ONLY the context above.
            - Follow EN/ASTM/JIS/GB/GOST/AS/NZS standards 100%.
            - If information is missing, say "Not enough data".
            - Do NOT invent clauses or values.
            - Be concise and factual.
            `;

        const answer = await runAI({ model, system, prompt });

        return NextResponse.json({ answer });
    } catch (err: any) {
       // console.error("🔥 AI ROUTE ERROR:", err);   // <‑‑ ADD THIS
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
