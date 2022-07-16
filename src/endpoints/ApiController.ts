import { EntityA } from "../business_entities/EntityA";
import { EntityB } from "../business_entities/EntityB";
import { PersistenceController } from "../persistence/PersistenceController";

export class ApiController{
    private persistenceController: PersistenceController
    constructor(){
        this.persistenceController = new PersistenceController();
    }

    public async createEntityA(jsonEntityA: any)
    {
        let entityBProps = {_id: jsonEntityA.entityB._id, name: jsonEntityA.entityB.name};
        let entityB = new EntityB(entityBProps);
        let entityAProps = {_id: jsonEntityA._id, name: jsonEntityA.name, entityB: entityB}
        let entityA = new EntityA(entityAProps)
        await this.persistenceController.createEntityA(entityA);
    }
}
