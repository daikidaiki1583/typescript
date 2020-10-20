// interface Human {
//     readonly name: string;
//     age: number;
//     greeting(message: string): void;
// }


interface Nameable {
    name?: string;
    nickName?: string;
}

const john: Nameable = {
    name:'john'
}

interface Human extends Nameable {
    
    greeting(message: string): void;

}

class Developer implements Human {
    name?: string;
    constructor(public age: number,initName? :string){}
    greeting(message: string) {
        console.log('hi')
    }
}

interface addFunc {
    (num1: number,num2: number): number;
}
let addFunc: addFunc;
addFunc = (n1: number,n2: number) => {
    return n1 + n2
}

