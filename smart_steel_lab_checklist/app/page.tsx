"use client";

import { useState, useEffect } from "react";
import { test_GradeStandards } from "../data/tests_grades";


export default function Home() {
    const gradeList = Object.keys(test_GradeStandards.grades);
    const [grade, setGrade] = useState(gradeList[0]);
    const applicationList = Object.keys(
        test_GradeStandards.grades[grade].applications
    );
    const [application, setApplication] = useState(applicationList[0]);

    const [testPlan, setTestPlan] = useState<any | null>(null);
    const [loadingPlan, setLoadingPlan] = useState(false);

    const [aiAnswer, setAiAnswer] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);

    // Load test plan whenever grade or application changes
    useEffect(() => {
        async function loadPlan() {
            setLoadingPlan(true);
            setTestPlan(null);

            const res = await fetch("/api/api-test-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ grade: grade, application: application })
            });

            const data = await res.json();
            setTestPlan(data);
            setLoadingPlan(false);
        }

        loadPlan();
    }, [grade, application]);


    async function handleAIExplain() {
        if (!testPlan) return;

        setLoadingAI(true);
        setAiAnswer("");

        const res = await fetch("/api/api-ai-prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: `Explain why these tests are required for ${grade} in ${application} application.`,
                context: testPlan,
            })
        });

        const data = await res.json();
        setAiAnswer(data.answer);
        setLoadingAI(false);
    }

    return (
        <main className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-3xl mx-auto space-y-6">

                <h1 className="text-3xl font-semibold">Steel Lab</h1>

                {/* Grade + Application */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Steel grade</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={grade}
                            onChange={(e) => {
                                const newGrade = e.target.value;
                                setGrade(newGrade);

                                // Reset application when grade changes
                                const newApps = Object.keys(
                                    test_GradeStandards.grades[newGrade].applications
                                );
                                setApplication(newApps[0]);
                            }}
                        >
                            {gradeList.map((g) => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Application</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={application}
                            onChange={(e) => setApplication(e.target.value)}
                        >
                            {applicationList.map((app) => (
                                <option key={app} value={app}>
                                    {app.replace(/_/g, " ")}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Test Plan */}
                <div className="bg-white rounded shadow p-4">
                    <h2 className="font-semibold mb-2">Required Test Plan</h2>

                    {loadingPlan && <p className="text-sm text-slate-500">Loading test plan…</p>}

                    {!loadingPlan && testPlan && (
                        <ul className="space-y-2 text-sm">
                            {testPlan.tests.map((t: any) => (
                                <li key={t.id} className="border-b pb-2">
                                    <span className="font-medium">{t.name}</span>
                                    <div className="text-xs text-slate-500">
                                        Standard: {t.standard?.join(", ")}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* AI Button */}
                <button
                    onClick={handleAIExplain}
                    disabled={!testPlan || loadingAI}
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loadingAI ? "Asking AI…" : "Ask AI why these tests are required"}
                </button>

                {/* AI Answer */}
                {aiAnswer && (
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="font-semibold mb-2">AI Explanation</h2>
                        <p className="text-sm whitespace-pre-line">{aiAnswer}</p>
                    </div>
                )}
            </div>
        </main>
    );
}

