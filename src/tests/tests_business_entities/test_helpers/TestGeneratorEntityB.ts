import { EntityB } from "../../../business_entities/EntityB";

export class TestGeneratorEntityB {
    constructor() {}

    public generateEntityB(): EntityB {
        // let entityBProps = {_id: null, }
        let entityB = new EntityB({name: 'Test entity B'});
        return entityB;
    }
}