import { test_GradeStandards } from "../data/tests_grades";
import { Application, GradeData } from "../data/type";

export function generateTestPlan(grade: string, applicationKey: string) {
    const gradeBlock: GradeData | undefined = test_GradeStandards.grades[grade as keyof typeof test_GradeStandards.grades];

    if (!gradeBlock) {
        throw new Error(`Unknown grade: ${grade}`);
    }

    const app: Application | undefined = gradeBlock.applications[applicationKey];

    if (!app) {
        throw new Error(`Unknown application: ${applicationKey}`);
    }

    const tests = app.required_tests.map((testId) => {
        const test = test_GradeStandards.tests[testId as keyof typeof test_GradeStandards.tests];

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
        };
    });

    return {
        grade,
        application: applicationKey,
        tests
    };
}
