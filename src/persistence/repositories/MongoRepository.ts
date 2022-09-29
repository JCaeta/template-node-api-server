import { Collection, Db, DeleteResult, InsertOneResult, ObjectId} from "mongodb";
import { BaseRepository } from "../interfaces/BaseRepository";

export abstract class MongoRepository implements BaseRepository{
    public readonly collection: Collection;

    constructor(db: Db, collectionName: string){
        this.collection = db.collection(collectionName)
    }

    async create(item: any): Promise<any>{
        
        const result: InsertOneResult<Document> = await this.collection.insertOne(item);
        return item;
    }

    async update(id: ObjectId, item: any): Promise<any> {
        const result = await this.collection.replaceOne({_id: id}, item);
        return result;
    }

    async delete(id: ObjectId): Promise<DeleteResult> {
        const result = await this.collection.deleteOne({_id: id});
        return result;
    }

    find(item: any): any{}
    findOne(id: ObjectId): any{}
}