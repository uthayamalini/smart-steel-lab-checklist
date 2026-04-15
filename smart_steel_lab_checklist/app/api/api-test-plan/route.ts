// app/api/generate-test-plan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateTestPlan } from "@/lib/rule_engine";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { grade, application } = body;

        // product can be used later for more rules
        const plan = generateTestPlan(grade, application);

        return NextResponse.json(plan);
    } catch (err: any) {
        // console.error("🔥 AI ROUTE ERROR:", err);   // <‑‑ ADD THIS
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
