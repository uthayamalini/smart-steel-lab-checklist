// lib/rule_engine.ts
import { test_GradeStandards } from "../data/tests_grades";

export function generateTestPlan(grade: string, applicationKey: string) {
    const gradeBlock = test_GradeStandards.grades[grade];

    if (!gradeBlock) {
        throw new Error(`Unknown grade: ${grade}`);
    }

    const app = gradeBlock.applications[applicationKey];
    if (!app) {
        throw new Error(`Unknown application: ${applicationKey}`);
    }

    const tests = app.required_tests.map((testId: string) => {
        const test = test_GradeStandards.tests[testId];

        if (!test) {
            throw new Error(`Unknown test id: ${testId}`);
        }

        return {
            id: testId,
            name: test.name,
            standard: test.standard,
            purpose: test.purpose,
            specimen: test.specimen,
            procedure_steps: test.procedure_steps
            // later: add acceptance_criteria from another JSON
        };
    });

    return {
        grade,
        application: applicationKey,
        tests
        //warnings: [] // later: add rule-based warnings
    };
}
