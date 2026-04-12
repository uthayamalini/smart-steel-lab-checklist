"use client";

import { useState } from "react";
import { CHECKLISTS } from "../data/checklists";
import { GRADES, APPLICATIONS } from "../data/meta";
import { logUsage } from "../lib/supabaseClient";
import { getSuggestedTests } from "../lib/suggestions";

export default function Home() {
    const [grade, setGrade] = useState<string>("G250");
    const [application, setApplication] = useState<string>("general");
    const [testType, setTestType] = useState<keyof typeof CHECKLISTS>("tensile");

    const checklist = CHECKLISTS[testType];
    const suggestions = getSuggestedTests(grade, application);

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w- 3xl mx-auto space-y-6">
                <h1 className="text-2xl md:text-3xl font-semibold">Smart Steel Lab Checklist</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Steel grade</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={grade}
                            onChange={e => {
                                setGrade(e.target.value);
                                logUsage(`grade:${e.target.value}`); }}
                        >
                            {GRADES.map(g => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Application</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={application}
                            onChange={e => setApplication(e.target.value)}
                        >
                            {APPLICATIONS.map(a => (
                                <option key={a}>{a}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Test type</label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={testType}
                            onChange={e => setTestType(e.target.value as any)}
                        >
                            <option value="tensile">Tensile</option>
                            <option value="hardness">Hardness</option>
                            <option value="coating">Coating</option>
                            <option value="microstructure">Microstructure</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded shadow p-4 space-y-3">
                    <h2 className="font-semibold mb-1">Checklist</h2>
                    <ul className="space-y-1">
                        {checklist.map(item => (
                            <li key={item} className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded shadow p-4 space-y-2">
                    <h2 className="font-semibold mb-1">Suggested tests (AI rules)</h2>
                    {suggestions.length === 0 ? (
                        <p className="text-sm text-slate-500">No additional suggestions for this combination.</p>
                    ) : (
                        <ul className="space-y-1 text-sm">
                            {suggestions.map(s => (
                                <li key={s.test}>
                                    <span className="font-medium capitalize">{s.test}</span>: {s.reason}
                                    {s.standardHint && <span className="block text-slate-500 text-xs">{s.standardHint}</span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    );
}
