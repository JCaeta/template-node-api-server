import { EntityB } from "./EntityB";

const defaults = {
    id: undefined,
    name: undefined,
    entityB: undefined
}

export class EntityA{
    public entityB: EntityB;
    public name: string;
    private id: any

    constructor(props: any){
        this.entityB = props.entityB || defaults.entityB;
        this.name = props.name || defaults.name;
        this.id = props.id || defaults.id;
    }

    public getEntityB(): any{
        return this.entityB;
    }

    public setEntityB(entityB: EntityB): void {
        this.entityB = entityB;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getId(): string {
        return this.id;
    }

    public setId(_id: string): void {
        this.id = _id;
    }
}
