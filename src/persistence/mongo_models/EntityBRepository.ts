import { ObjectId, DeleteResult, Db } from "mongodb";
import { MongoRepository } from "../repositories/MongoRepository";

export class EntityBRepository extends MongoRepository{

    constructor(db: Db, collectionName: string){
        super(db, collectionName);
    }

    async create(mongoEntityB: any): Promise<void>
    {
        await super.create(mongoEntityB);
    }

    async update(_id: ObjectId, item: any): Promise<any> {
        item.setId(new ObjectId(item.getId()))
        const result = await super.update(_id, item);

        // Set back again the item's id to string
        item._id = _id;
        return result;
    }

    async delete(id: ObjectId): Promise<DeleteResult> {
        return await super.delete(id);
    }

    async find(entityB: any): Promise<any[]> {
        throw new Error("Method not implemented.");
    }a

    async findOne(id: ObjectId): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async createIfNotExists(entityB: any): Promise<void>{
        let resultFind = await this.findOneByName(entityB.name);
        if(resultFind === null)
        {
            await this.create(entityB);
        }
        else
        {
            entityB._id = resultFind._id;
        }
    }

    async findOneByName(name: string): Promise<any>
    {
        let result = await this.collection.findOne({name: name});
        if(result == null)
        {
            return null;
        }
        return result;;
    }
}

