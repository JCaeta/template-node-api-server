import { EntityA } from "../../business_entities/EntityA";
import { EntityB } from "../../business_entities/EntityB";
import { TestGeneratorEntityA } from "./test_helpers/TestGeneratorEntityA";
import { TestPrinterEntityA } from "./test_helpers/TestPrinterEntityA";

describe('Test EntityA', () =>{
    test("Test getEntityB() method", () => {
        console.log('Test getEntityB() method -------------------------------------------------------------------------------- ');
        let testPrinter = new TestPrinterEntityA('Test EntityA().getEntityB()');
        let testGenerator = new TestGeneratorEntityA();
        
        // 1) Create an EntityA object
        testPrinter.addStep({stepName: "1) Create an EntityA object", state: 'getEntityB() not called'});
        
        let entityA = testGenerator.generateEntityA();
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();

        // 2) Call getEntityB() method
        testPrinter.addStep({stepName: '2) Call getEntityB() method', state: 'getEntityA() method called'});
        let b = entityA.getEntityB();
        testPrinter.addObjectCurrentStep({b: b});
        testPrinter.printCurrentStep();
    });
});