import { EntityB } from "./EntityB";

const defaults = {
    _id: null,
    name: null,
    entityB: null
}

export class EntityA{
    public entityB: EntityB;
    public name: string;
    private _id: string

    constructor(props: any){
        this.entityB = props.entityB || defaults.entityB;
        this.name = props.name || defaults.name;
        this._id = props._id || defaults._id;
    }

    public getEntityB(): EntityB {
        return this.entityB;
    }

    public setEntityB(entityB: EntityB): void {
        this.entityB = entityB;
    }

    public getUsername(): string {
        return this.name;
    }

    public setUsername(name: string): void {
        this.name = name;
    }

    public getId(): string {
        return this._id;
    }

    public setId(_id: string): void {
        this._id = _id;
    }
}
