export type TestType = "tensile" | "hardness" | "coating" | "microstructure";

export const CHECKLISTS: Record<TestType, string[]> = {
    tensile: [
        "Verify sample dimensions",
        "Check gauge length",
        "Calibrate tensile machine",
        "Record YS, UTS, elongation",
    ],
    hardness: [
        "Prepare flat surface",
        "Select correct indenter and load",
        "Apply load",
        "Record hardness value and scale",
    ],
    coating: [
        "Check surface cleanliness",
        "Measure dry film thickness (DFT)",
        "Perform adhesion test",
        "Inspect for visible defects",
    ],
    microstructure: [
        "Section sample",
        "Mount and grind",
        "Polish and etch",
        "Observe and record microstructure",
    ],
};
