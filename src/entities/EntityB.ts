const defaults = {
    id: null,
    name: null
}

export class EntityB{
    private _id: any
    public name: string;

    constructor(props: any){
        this._id = props.id || defaults.id;
        this.name = props.name || defaults.name;
    }

    public setId(id: any)
    {
        this._id = id;
    }

    public getId(): string
    {
        return this._id;
    }

    public setName(name: string)
    {
        this.name = name;
    }

    public getName()
    {
        return this.name;
    }
}


