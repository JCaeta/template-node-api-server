import { ObjectId, DeleteResult, Db } from "mongodb";
import { EntityB} from "../../business_entities/EntityB";
import { MongoRepository } from "../repositories/MongoRepository";

export class EntityBRepository extends MongoRepository{

    constructor(db: Db, collectionName: string){
        super(db, collectionName);
    }

    async create(mongoEntityB: any): Promise<void>
    {
        await super.create(mongoEntityB);
        // entityB.setId(item._id.toString());
        // return entityB;   
    }

    // async create(item: EntityB): Promise<void>
    // {
    //     let toInsert = {_id: item.getId(), name: item.getName()};
    //     await super.create(toInsert);   
    // }

    async update(_id: ObjectId, item: any): Promise<any> {
        // Convert ids to ObjectId
        // let _id = new ObjectId(_id);
        item.setId(new ObjectId(item.getId()))
        const result = await super.update(_id, item);

        // Set back again the item's id to string
        item._id = _id;
        return result;
    }

    async delete(id: ObjectId): Promise<DeleteResult> {
        // const _id = new ObjectId(id);
        return await super.delete(id);
    }

    async find(entityB: any): Promise<any[]> {
        throw new Error("Method not implemented.");
    }a

    async findOne(id: any): Promise<any> {
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
            // entityB.setId(resultFind._id.toString());
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
        return result;
        // let props = {id: result._id.toString(), name: result.name};
        // let identityProvider: EntityB= new EntityB(props);
        // return identityProvider;
    }
}

