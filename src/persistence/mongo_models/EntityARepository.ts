import { Db, DeleteResult, ObjectId } from "mongodb";
import { EntityA } from "../../business_entities/EntityA";
import { MongoRepository } from "../repositories/MongoRepository";

export class EntityARepository extends MongoRepository {

    constructor(db: Db, collectionName: string){
        super(db, collectionName);
    }

    async create(entityA: any): Promise<void> {     
        await super.create(entityA);
    }

    async update(id: ObjectId, entityA: any): Promise<any> {
        
    }

    async delete(id: ObjectId): Promise<DeleteResult> {
        const result: DeleteResult = await this.collection.deleteOne({"_id": new ObjectId(id)});
        return result;
    }

    async find(item: ObjectId): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(id: ObjectId): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

