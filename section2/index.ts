let hasValue = true;

function echo(message: string): string | null {
    return message;
}
let nullablemessage = echo('hi');
// nullablemessage.toUpperCase nullである可能性があるためstringとして扱えない
if (nullablemessage) {
    nullablemessage.toUpperCase();
}

abstract class Person {

    constructor(public readonly name: string,private readonly age: number) {
    }

    greeting(this: Person) {
        console.log(`Hello!My name is ${this.name}.
        I am ${this.age} years old`);
        this.explainJob();
    }   
    
    abstract explainJob(): void;
}

class Teacher extends Person {
    explainJob() {
        console.log();
    }
}

