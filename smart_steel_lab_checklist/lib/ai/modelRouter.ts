export function chooseModel(task: string) {
    switch (task) {
        case "test_plan":
        case "quick_explain":
        case "parameter_validation":
            return "llama"; 

        //case "compliance":
        //case "deep_reasoning":
        //case "mtc_generation":
        //    return  "claude"; 

        default:
            return "llama";
    }
}
