import { ObjectId, DeleteResult, InsertOneResult, Db, ClientSession} from "mongodb";
import { EntityB} from "../../entities/EntityB";
import { MongoRepository } from "../repositories/MongoRepository";

export class EntityBRepository extends MongoRepository<EntityB>{

    constructor(db: Db, collectionName: string){
        super(db, collectionName);
    }

    async create(item: EntityB): Promise<EntityB>
    {
        return await super.create(item);   
    }

    // async create(item: EntityB): Promise<void>
    // {
    //     let toInsert = {_id: item.getId(), name: item.getName()};
    //     await super.create(toInsert);   
    // }

    async update(id: string, item: EntityB): Promise<any> {
        // Convert ids to ObjectId
        let _id = new ObjectId(id);
        item.setId(new ObjectId(item.getId()))
        const result = await super.update(_id, item);

        // Set back again the item's id to string
        item.setId(id);
        return result;
    }

    async delete(id: string): Promise<DeleteResult> {
        const _id = new ObjectId(id);
        return await super.delete(_id);
    }

    async find(identityProvider: EntityB): Promise<EntityB[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(id: any): Promise<EntityB> {
        throw new Error("Method not implemented.");
    }

    async createIfNotExists(entityB: EntityB): Promise<void>{
        let resultFind = await this.findOneByName(entityB.getName());
        if(resultFind === null)
        {
            await this.create(entityB);
        }
        else
        {
            entityB.setId(resultFind._id.toString());
        }
    }

    async findOneByName(name: string): Promise<any>
    {
        let result = await this._collection.findOne({name: name});
        if(result == null)
        {
            return null;
        }
        let props = {id: result._id.toString(), name: result.name};
        let identityProvider: EntityB= new EntityB(props);
        return identityProvider;
    }
}

