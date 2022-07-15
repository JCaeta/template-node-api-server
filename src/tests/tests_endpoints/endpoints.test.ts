import { EntityA } from "../../entities/EntityA";
import { EntityB } from "../../entities/EntityB";
import { TestPrinterEndpoints } from "./test_helpers/TestPrinterEndpoints";
import endpoints from '../../endpoints/endpoints';
import request from 'supertest';
import { TestGeneratorEntityA } from "../tests_entities/test_helpers/TestGeneratorEntityA";

const TIMEOUT = 1000000;

describe('Test endpoints', () => {
    test('Test POST request', async () => {
        console.log('Test POST request -------------------------------------------------------------------------------- ');
        let testPrinter = new TestPrinterEndpoints('Test POST request');
        let testGenerator = new TestGeneratorEntityA();
        
        // 1) Create EntityA object
        testPrinter.addStep({stepName: '1) Create EntityA object', state: 'Request not sent'});
        let entityA = testGenerator.generateEntityA();
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();

        // 2) Send request
        testPrinter.addStep({stepName: '2) Send request', state: 'Request sent'});
        let response = await request(endpoints).post('/test-post-request').send(entityA);
        testPrinter.addObjectCurrentStep({response: response.body});
        testPrinter.printCurrentStep();
        endpoints.close();
    }, TIMEOUT);

    test.only('Test createEntityA() request', async () => {
        console.log('Test createEntityA() request ----------------------------------------------------- ');
        let testPrinter = new TestPrinterEndpoints('Test createEntityA() request');
        let e = endpoints;
        
        // 1) Create an EntityA Object
        testPrinter.addStep({stepName: '1) Create an EntityA object', state: 'Request not sent'});
        let entityB = new EntityB({name: 'entity B endpoints'})
        let entityA = new EntityA({name: 'entity A endpoints' , entityB: entityB});
        testPrinter.addObjectCurrentStep({entityA: entityA});
        testPrinter.printCurrentStep();

        // 2) Send POST request
        testPrinter.addStep({stepName: '2) Send POST request'});
        let response = await request(e).post('/create-entity-a').send({entityA: entityA});
        
        testPrinter.addObjectCurrentStep({response: response.body});
        testPrinter.setState('POST request sent');
        testPrinter.printCurrentStep();
        endpoints.close();
    
    }, TIMEOUT);
});
