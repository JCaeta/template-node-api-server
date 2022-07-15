import { PersistenceController } from '../../../persistence/PersistenceController';
import { TestGeneratorEntityA } from '../../tests_entities/test_helpers/TestGeneratorEntityA';
import {TestPrinterPersistenceController} from './test_helpers/TestPrinterPersistenceController';

const TIMEOUT = 100000;

describe('Test PersistenceController', () => {
    test('Test PersistenceController.createEntityA()', async () => {
        let testPrinter = new TestPrinterPersistenceController('Test PersistenceController.createEntityA()');
        let testGenerator = new TestGeneratorEntityA();
        let persistenceController = new PersistenceController();

        // 1) Create entityA object
        testPrinter.addStep({stepName: '1) Create entityA object', state: 'createEntityA()'});
        let entityA = testGenerator.generateEntityA();
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();

        // 2) Call the createEntityA() method
        testPrinter.addStep({stepName: '2) Call the createEntityA() method', state: 'createEntityA() method called'});
        await persistenceController.createEntityA(entityA);
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();
    }, TIMEOUT);
})