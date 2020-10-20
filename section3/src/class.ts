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
    private static instance: Teacher;
    explainJob() {
        console.log();
    } 

    private constructor(name: string,age: number){
        super(name,age);
    }

    static getInstance() {
        if (Teacher.instance) return Teacher.instance
        Teacher.instance = new Teacher('Quill',38);
        return Teacher.instance;
    }
}

const teacher = Teacher.getInstance();