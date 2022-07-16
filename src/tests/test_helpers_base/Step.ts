import {inspect} from 'util';

const defaults = {
    testName: "",
    stepName: "", 
    objects: new Array(), 
    state: ""
};

export class Step{
    private printStructure = {testName: "", currentStep: "", objects: new Array(), state: ""}

    constructor(props: any)
    {
        this.printStructure.testName = props.testName || defaults.testName;
        this.printStructure.currentStep = props.stepName || defaults.stepName;
        this.printStructure.objects = props.objects || defaults.objects;
        this.printStructure.state = props.state || defaults.state;
    }

    public printStep()
    {
        console.log(inspect(this.printStructure, {showHidden: false, depth: null, colors: true}))
    }

    public setObjects(objects: any)
    {
        this.printStructure.objects = objects ;
    }

    public addObject(object: any)
    {
        this.printStructure.objects.push(object);
    }

    public setState(state: string)
    {
        this.printStructure.state = state;
    }
}