import { TestPrinterEndpoints } from "./test_helpers/TestPrinterEndpoints";
import { TestGeneratorEntityA } from "../tests_business_entities/test_helpers/TestGeneratorEntityA";
import { ApiController } from "../../endpoints/ApiController";

const TIMEOUT = 100000;

describe('Test ApiController', () => {
    test('Test ApiController.createEntityA()', async () => {
        console.log('Test ApiController.createEntityA() -------------------------------------------------------------------------------- ');
        let testPrinter = new TestPrinterEndpoints('Test POST request');
        let testGenerator = new TestGeneratorEntityA();
        let apiController = new ApiController();
        
        // 1) Create EntityA object
        testPrinter.addStep({stepName: '1) Create EntityA object', state: 'createEntityA() method not called'});
        let entityA = testGenerator.generateEntityA();
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();

        // 2) Call the createEntityA() method
        testPrinter.addStep({stepName: '2) Call the createEntityA() method', state: 'createEntityA() method called'});
        await apiController.createEntityA(entityA);
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();
        
    }, TIMEOUT);
});
