import { ClientSession, MongoClient } from "mongodb";
import { EntityA } from "../../entities/EntityA";
import { IUnitOfWork } from "../interfaces/IUnitOfWork";
import { EntityBRepository } from "../mongo_models/EntityBRepository";
import { EntityARepository } from "../mongo_models/EntityARepository";
import { EntityB } from "../../entities/EntityB";

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
            let entityBRepository = new EntityBRepository(db, 'entitiesB')
            await entityBRepository.createIfNotExists(entityA.getEntityB());

            let entityARepository = new EntityARepository(db, 'entitiesA');
            await entityARepository.create(entityA);
        }
    }

    // public createEntityA(entityA: EntityA){
    //     let db0 = this.connection?.db(this.databaseName);
    //     if(db0 != undefined && this.session != undefined)
    //     {   
    //         let entityBRepository = new EntityBRepository(db0, 'entitiesB')
    //         entityBRepository.createIfNotExists(entityA.getEntityB());

    //         // var db1 = this.connection?.db(this.databaseName);
    //         // var entityARepository = new EntityARepository(db1, 'entitiesA');
    //         // var h = await entityARepository.create(entityA);
    //     }
    // }

    public async createEntityB(entityB: EntityB){
        let db = this.connection?.db(this.databaseName);
        if(db != undefined && this.session != undefined)
        {   
            let entityBRepository = new EntityBRepository(db, 'entitiesB')
            await entityBRepository.create(entityB);
        }
    }
}
