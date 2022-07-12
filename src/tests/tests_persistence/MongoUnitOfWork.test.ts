import { EntityA } from "../../entities/EntityA";
import { EntityB } from "../../entities/EntityB"; 
import { MongoUnitOfWork } from "../../persistence/repositories/MongoUnitOfWork";
import { TestHelperMongoUnitOfWork } from "./test_helpers/MongoUnitOfWorkTestHelper";

const URI = 'mongodb://localhost:27017';
const TIMEOUT = 100000;
const DATABASE_NAME = 'entities_management';

describe("Test MongoUnitOfWork", () => {
    test("Test connection", async () => {
        console.log("Test MongoUnitOfWork.connect() -----------------------------------------------------------------------------------")
        let testHelper = new TestHelperMongoUnitOfWork('Test connection');
        testHelper.addStep({stepName: '1) Call the MongoUnitOfWork.connect() method', state: 'Not called'});
        testHelper.addObjectCurrentStep({uri: URI})
        testHelper.printCurrentStep();
        let mongoUnitOfWork = new MongoUnitOfWork('entities_management');
        mongoUnitOfWork.connect(URI);
        testHelper.setState('Called');
        testHelper.printCurrentStep();
        mongoUnitOfWork.disconnect();
    });

    test.only("Test MongoUnitOfWork.createEntityA()", async () => {
        console.log("Test MongoUnitOfWork.createEntityA() -----------------------------------------------------------------------------------")
        // 1) Create user
        let testHelper = new TestHelperMongoUnitOfWork('Test MongoUnitOfWork.createEntityA()');
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

        let mongoUnitOfWork = new MongoUnitOfWork('entities_management');
        await mongoUnitOfWork.connect(URI);
        await mongoUnitOfWork.createEntityA(entityA);
        await mongoUnitOfWork.commit();
        mongoUnitOfWork.disconnect();
    }, TIMEOUT);
});
