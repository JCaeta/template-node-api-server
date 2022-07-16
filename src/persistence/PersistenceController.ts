import { EntityA } from "../business_entities/EntityA";
import { MongoUnitOfWork } from "./repositories/MongoUnitOfWork";

const DATABASE_NAME = 'entities_management';
const URI = 'mongodb://localhost:27017';

export class PersistenceController {
    private mongoUnitOfWork: MongoUnitOfWork;
    constructor(){
        this.mongoUnitOfWork = new MongoUnitOfWork(DATABASE_NAME);
    }

    public async createEntityA(entityA: EntityA){
        await this.mongoUnitOfWork.connect(URI);
        await this.mongoUnitOfWork.createEntityA(entityA);
        await this.mongoUnitOfWork.commit();
        this.mongoUnitOfWork.disconnect();
    }
}
