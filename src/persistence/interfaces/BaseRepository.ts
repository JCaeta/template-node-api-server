import { IWrite } from "./IWrite";
import { IRead } from "./IRead";

export interface BaseRepository<T> extends IWrite<T>, IRead<T>{
    create(item: T): any;
    // create(item: any): void;
    update(id: any, item: T): any;
    delete(id: any): any;
    find(item: T): any;
    findOne(id: string): any;
}