import { ClientSession, MongoClient } from "mongodb";
import { EntityA } from "../../entities/EntityA";
import { IUnitOfWork } from "../interfaces/IUnitOfWork";
import { EntityBRepository } from "../mongo_models/EntityBRepository";
import { EntityARepository } from "../mongo_models/EntityARepository";

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
        console.log(this.session);
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
            let entityBRepository = await new EntityBRepository(db, 'entitiesB')
            await entityBRepository.createIfNotExists(entityA.getEntityB());

            let entityARepository = await new EntityARepository(db, 'entitiesA');
            await entityARepository.create(entityA);
        }
    }
}
