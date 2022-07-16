export interface IWrite {
    find(item: any): Promise<any[]>;
    findOne(id: any): Promise<any>;
}
