import { ClientSession, MongoClient, ObjectId } from "mongodb";
import { EntityA } from "../../business_entities/EntityA";
import { IUnitOfWork } from "../interfaces/IUnitOfWork";
import { EntityBRepository } from "../mongo_models/EntityBRepository";
import { EntityARepository } from "../mongo_models/EntityARepository";
import { EntityB } from "../../business_entities/EntityB";
import { MongoAdapter } from "./MongoAdapter";

export class MongoUnitOfWork implements IUnitOfWork{
    private connection: MongoClient | undefined;
    private session: ClientSession | undefined;
    private client: MongoClient | undefined;
    private databaseName: string;

    constructor(databaseName: string){
        this.connection = undefined;
        this.client = undefined;
        this.session = undefined;
        this.databaseName = databaseName;
    }

    async commit(): Promise<void> {
        await this.session?.commitTransaction();
    };

    async abort(): Promise<void> {
        await this.session?.abortTransaction();
    };
    
    public async connect(uri: string): Promise<boolean>{
        this.client = new MongoClient(uri);
        this.connection = await this.client.connect();
        this.session = this.client.startSession();
        this.session.startTransaction();

        return true;
    };

    public disconnect(): void{
        this.connection?.close();
    };

    public async createEntityA(entityA: EntityA){
        let db = this.connection?.db(this.databaseName);
        if(db != undefined && this.session != undefined)
        {   
            let mongoEntityA = MongoAdapter.entityABusinessToMongo(entityA);
            let entityBRepository = new EntityBRepository(db, 'entitiesB')
            await entityBRepository.createIfNotExists(mongoEntityA.entityB);

            let entityARepository = new EntityARepository(db, 'entitiesA');
            await entityARepository.create(mongoEntityA);
        }
    }

    public async createEntityB(entityB: EntityB){
        let db = this.connection?.db(this.databaseName);
        if(db != undefined && this.session != undefined)
        {   
            let mongoEntityB = MongoAdapter.entityBBusinessToMongo(entityB)
            let entityBRepository = new EntityBRepository(db, 'entitiesB')
            await entityBRepository.create(mongoEntityB);
        }
    }
}
