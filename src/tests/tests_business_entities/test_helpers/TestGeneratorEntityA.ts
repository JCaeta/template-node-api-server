import { EntityA } from "../../../business_entities/EntityA";
import { EntityB } from "../../../business_entities/EntityB";

export class TestGeneratorEntityA {
    constructor() {}

    public generateEntityA(): EntityA{
        // Not implemented idea: generate random attribute values
        let entityB = new EntityB({name: 'entity B endpoints'})
        let entityA = new EntityA({name: 'entity A endpoints' , entityB: entityB});
        return entityA;
    }
}