import type { TestType } from "../data/checklists";

export type Suggestion = {
    test: TestType;
    reason: string;
    standardHint?: string;
};

export function getSuggestedTests(grade: string, application: string): Suggestion[] {
    const suggestions: Suggestion[] = [];

    if (grade === "G550" && application !== "structural") {
        suggestions.push({
            test: "tensile",
            reason: "High-strength grade – verify yield and tensile strength.",
            standardHint: "Align with tensile test procedures (e.g. ASTM E8 / AS 1391).",
        });
        suggestions.push({
            test: "hardness",
            reason: "Check hardness to correlate with strength and forming behaviour.",
            standardHint: "Use appropriate hardness method (e.g. ASTM E10/E18).",
        });
    }

    if (application === "coated" || application === "roofing") {
        suggestions.push({
            test: "coating",
            reason: "Coated product – verify coating thickness and adhesion.",
            standardHint: "Consider coating tests (e.g. DFT, adhesion, visual inspection).",
        });
    }

    if (application === "structural") {
        suggestions.push({
            test: "tensile",
            reason: "Structural application – tensile properties are critical for design.",
        });
        suggestions.push({
            test: "microstructure",
            reason: "Microstructure affects toughness and weldability.",
        });
    }

    return suggestions;
}
