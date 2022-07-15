import { Collection, Db, DeleteResult, InsertOneResult} from "mongodb";
import { BaseRepository } from "../interfaces/BaseRepository";

export abstract class MongoRepository<T extends {setId?: any, getId?: any}> implements BaseRepository<T>{
    public readonly _collection: Collection;

    constructor(db: Db, collectionName: string){
        this._collection = db.collection(collectionName)
    }

    async create(item: T): Promise<T>{
        
        const result: InsertOneResult<Document> = await this._collection.insertOne(item);
        item.setId(result.insertedId.toString());
        return item;
    }

    // async create(item: any): Promise<void>{
        
    //     const result: InsertOneResult<Document> = await this._collection.insertOne(item);
    //     // await this._collection.insertOne(item);
        
    //     // item.setId(result.insertedId.toString());
    // }

    async update(id: any, item: T): Promise<any> {
        const result = await this._collection.replaceOne({_id: id}, item);
        return result;
    }

    async delete(id: any): Promise<DeleteResult> {
        const result = await this._collection.deleteOne({_id: id});
        return result;
    }

    find(item: T): any{}
    findOne(id: string): any{}
}