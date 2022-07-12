import { Db, DeleteResult, ObjectId } from "mongodb";
import { EntityA } from "../../entities/EntityA";
import { MongoRepository } from "../repositories/MongoRepository";

export class EntityARepository extends MongoRepository<EntityA> {

    constructor(db: Db, collectionName: string){
        super(db, collectionName);
    }

    async create(entityA: EntityA): Promise<EntityA> {     
        return await super.create(entityA);
    }

    async update(id: any, entityA: EntityA): Promise<any> {
        
    }

    async delete(id: string): Promise<DeleteResult> {
        const result: DeleteResult = await this._collection.deleteOne({"_id": new ObjectId(id)});
        return result;
    }

    async find(item: EntityA): Promise<EntityA[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(id: string): Promise<EntityA> {
        throw new Error("Method not implemented.");
    }
}

