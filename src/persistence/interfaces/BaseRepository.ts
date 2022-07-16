import { IWrite } from "./IWrite";
import { IRead } from "./IRead";

export interface BaseRepository extends IWrite, IRead{
    create(item: any): any;
    // create(item: any): void;
    update(id: any, item: any): any;
    delete(id: any): any;
    find(item: any): any;
    findOne(id: any): any;
}