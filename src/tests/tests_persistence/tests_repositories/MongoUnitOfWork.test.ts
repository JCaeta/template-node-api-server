import { EntityA } from "../../../entities/EntityA";
import { EntityB } from "../../../entities/EntityB"; 
import { MongoUnitOfWork } from "../../../persistence/repositories/MongoUnitOfWork";
import { TestGeneratorEntityA } from "../../tests_entities/test_helpers/TestGeneratorEntityA";
import { TestGeneratorEntityB } from "../../tests_entities/test_helpers/TestGeneratorEntityB";
import { TestPrinterMongoUnitOfWork } from "../test_helpers/TestPrinterMongoUnitOfWork";

const URI = 'mongodb://localhost:27017';
const TIMEOUT = 100000;
const DATABASE_NAME = 'entities_management';

describe("Test MongoUnitOfWork", () => {
    test("Test connection", async () => {
        console.log("Test MongoUnitOfWork.connect() -----------------------------------------------------------------------------------")
        let testHelper = new TestPrinterMongoUnitOfWork('Test connection');
        testHelper.addStep({stepName: '1) Call the MongoUnitOfWork.connect() method', state: 'Not called'});
        testHelper.addObjectCurrentStep({uri: URI})
        testHelper.printCurrentStep();
        let mongoUnitOfWork = new MongoUnitOfWork(DATABASE_NAME);
        mongoUnitOfWork.connect(URI);
        testHelper.setState('Called');
        testHelper.printCurrentStep();
        mongoUnitOfWork.disconnect();
    }, TIMEOUT);

    test('Test create EntityB object', async () => {
        console.log('Test create EntityB object ---------------------------------------------------------------------------------------------');
        let testPrinter = new TestPrinterMongoUnitOfWork('Test create EntityB object');
        let mongoUnitOfWork = new MongoUnitOfWork(DATABASE_NAME);
        let testGenerator = new TestGeneratorEntityB()

        // 1) Create an EntityB object
        testPrinter.addStep({stepName: '1) Create an EntityB object', state: 'create() method not called'});
        let entityB = testGenerator.generateEntityB();
        testPrinter.addObjectCurrentStep({entityB: entityB});
        testPrinter.printCurrentStep();

        // 2) Insert object in the database
        testPrinter.addStep({stepName: '2) Insert object in the database', state: 'create() method called'});
        await mongoUnitOfWork.connect(URI);
        await mongoUnitOfWork.createEntityB(entityB);
        mongoUnitOfWork.disconnect()
        testPrinter.addObjectCurrentStep({entityB: entityB});
        testPrinter.printCurrentStep();

    }, TIMEOUT);

    test.only("Test MongoUnitOfWork.createEntityA()", async () => {
        console.log("Test MongoUnitOfWork.createEntityA() -----------------------------------------------------------------------------------")
        // 1) Create user
        let testHelper = new TestPrinterMongoUnitOfWork('Test MongoUnitOfWork.createEntityA()');
        testHelper.addStep({stepName: '1) Create user'});
        testHelper.setState('createUser() method not called');

        let entityBProps = {name: 'test EntityB 1'};
        let entityB = new EntityB(entityBProps);
        let entityAProps = {name: 'test entityA 1', entityB: entityB}
        let entityA = new EntityA(entityAProps);

        testHelper.addObjectCurrentStep({entityA: entityA});
        testHelper.printCurrentStep();

        // 2) Call the createEntityA() method
        testHelper.addStep({stepName: '2) Call the createEntityA() method'});

        let mongoUnitOfWork = new MongoUnitOfWork(DATABASE_NAME);
        await mongoUnitOfWork.connect(URI);
        await mongoUnitOfWork.createEntityA(entityA);
        await mongoUnitOfWork.commit();
        mongoUnitOfWork.disconnect();
    }, TIMEOUT);
});
