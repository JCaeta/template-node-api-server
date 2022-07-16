import { ObjectId } from "mongodb";
import { EntityA } from "../../business_entities/EntityA";
import { EntityB } from "../../business_entities/EntityB";

export class MongoAdapter {
    
    public static entityBBusinessToMongo(entityB: EntityB)
    {
        let mongoEntityB = {
            _id: entityB.getId() != undefined ? new ObjectId(entityB.getId()) : null,
            name: entityB.getName()
        }
        return mongoEntityB;
    }

    public static entityABusinessToMongo(entityA: EntityA){
        let mongoEntityA = {
            _id: entityA.getId() != undefined ? new ObjectId(entityA.getId()) : null,
            name: entityA.getName(),
            entityB: this.entityBBusinessToMongo(entityA.getEntityB())
        }
        return mongoEntityA;
    }
}
