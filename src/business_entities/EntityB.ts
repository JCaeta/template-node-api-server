const defaults = {
    id: undefined,
    name: undefined
}

export class EntityB{
    private id: any
    public name: string;

    constructor(props: any){
        this.id = props.id || defaults.id;
        this.name = props.name || defaults.name;
    }

    public setId(id: any)
    {
        this.id = id;
    }

    public getId(): string
    {
        return this.id;
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


