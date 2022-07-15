import { Step } from "../tests_persistence/test_helpers/Step";

export abstract class TestPrinterBase{
    private steps: Step[] = [];
    private testName: string;

    constructor(testName: string)
    {
        this.testName = testName;
    }

    public addStep(props: any)
    {
        let propsAux = {
            testName: this.testName,
            stepName: props.stepName || null,
            objects: props.objects || new Array(),
            state: props.state || null
        }

        let step = new Step(propsAux);
        this.steps.push(step);
    }

    public setObjectsCurrentStep(objects: any)
    {
        this.steps[this.steps.length - 1].setObjects(objects);
    }

    public addObjectCurrentStep(object: any)
    {
        this.steps[this.steps.length - 1].addObject(object);
    }

    public setState(state: string)
    {
        this.steps[this.steps.length - 1].setState(state);
    }

    public printCurrentStep()
    {
        this.steps[this.steps.length - 1].printStep();
    }
}