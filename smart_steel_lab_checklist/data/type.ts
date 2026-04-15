// types.ts

// Shape of a single application
export type Application = {
    description: string;
    required_tests: string[];
};

// Shape of a single grade entry
export type GradeData = {
    system: string;
    category: string;
    applications: Record<string, Application>;
};


// Shape of the entire grades object
export type Grades = Record<string, GradeData>;


