export interface IRead {
    find(item: any): Promise<any[]>;
    findOne(id: any): Promise<any>;
}


