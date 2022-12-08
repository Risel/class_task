interface IItem {
    id: number | string
    parent: number | string
    type?: string | null
}
type IId = number | string

interface ITree {
    getAll(): IItem[]
    getItem(id:IId): IItem | undefined
    getChildren(id:IId): IItem[]
    getAllChildren(id:IId): IItem[]
    getAllParents(id:IId): IItem[]
}

class TreeStore implements ITree{
    private items: IItem[]

    constructor(items:IItem[]) {
        this.items = items
    }

    getAll(): IItem[] {
        return this.items
    }

    getItem(id: IId): IItem | undefined {
        return this.items.find((item) => item.id === id)
    }

    getChildren(id: IId): IItem[] {
        return this.items.filter((item) => item.parent === id)
    }
    getAllChildren(id: IId): IItem[] {
        const children = this.getChildren(id)
        return children.concat(
            children.reduce((acc,item) => {
                const children = this.getAllChildren(item.id)
                return acc.concat(children)
            },[])
        )
    }

    getAllParents(id: IId): IItem[] {
        const item = this.getItem(id)
        const parent = this.getItem(item.parent)
        if(!item || !parent) return []
        return [parent].concat(this.getAllParents(parent.id))
    }
}

const items:IItem[] = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);

console.log(ts.getAll())
