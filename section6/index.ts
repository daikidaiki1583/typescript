function copy<T>(value: T): T {
    return value;
}
copy('hello');
copy({name: 'dai'});

type K = keyof {name: string; age: number } 

function copy1<T extends { name: string },U extends keyof T>(value: T,key: U): T {
    value[key];
    return value;
}
copy1({name: 'Quill',age: 38}, 'age')


class LightDatabase<T extends string | number | boolean > {
    private data: T[] = [];
    add(item: T) {
        this.data.push(item);
    }
    remove(item: T){
        this.data.splice(this.data.indexOf(item),1)
    }
    get(){
        return this.data;
    }
}
const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('fa');
stringLightDatabase.add('gt');

type TmpDatabase<T> = {
    id: number;
    data: T[];
}

interface Todo {
    title: string;
    text: string;
}

type Test1 = Partial<Todo>
type Test2 = Readonly<Todo>

const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    },2000);
})

fetchData.then(data => {
    data.toUpperCase();
})

interface Vegetables {
    readonly tomato: string;
    pumpkin: string;
}

type MappedTypes = {
    -readonly [P in keyof Vegetables]: string
}

type ConditionalTypes = 'tomato' extends string ? number : boolean
type ConditionalTypesInfer = { tomato:string }  extends { tomato: infer R} ? R : boolean;
type DistributiveConditionalTypes<T> = T extends 'tomato' ? number : boolean;
let tmp4: DistributiveConditionalTypes<'tomato' | 'pumpkin'>