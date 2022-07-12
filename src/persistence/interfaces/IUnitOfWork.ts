export interface IUnitOfWork{
    commit(): void;
    abort(): void;
    connect(options: any): Promise<boolean>;
    disconnect(): void;
}