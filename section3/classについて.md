# Class

## this
thisが何を示すかは,定義されたときに決まるのではなく、呼び出された時にきまる。アロー関数では、thisは定義に決まる。<br>
下記のthisはPersonのインスタンスのことを指す。

```TypeScript
    class Person {
        name: string;
        constructor(initName: string) {
            this.name = initName;
        }

        greeting(){
            console.log(`Hello my name is ${this.name}`)
        }
    }

    const quill = new Person('Quill');

```
下記の例では、上記で作成したPersonクラス内部のメソッドを呼び出して実行している。<br>
この場合,thisはanotherQuillを指すことになるが,anotherQuillにはnameが指定されておらず、undefinedになる。
```TypeScript
    const anotherQuill = {
    anotherGreeting: quill.greeting
    }

    anotherQuill.anotherGreeting();

```
また、下記のように直接thisが含まれており、そのオブジェクトに指定されたプロパティが無い場合はエラーが出る。
```TypeScript

    const anotherQuill = {
        anotherGreeting: function () {
            console.log(`Hello my name is ${this.name}`)
        }
    }

```
コードの内容としては上記の場合と同じ意味だが、上記の場合にはエラーが出ない。この理由は、TypeScriptでは間接的に使われる関数の内部(この場合はPersonのgreeting)にthisが含まれているかどうか、thisがどのように使用されているかを明らかにするには<strong>呼び出し元の関数の第一引数にthisを指定して、型注釈する必要があるから。</strong>具体的には下記のように書く。
```TypeScript
       class Person {
        name: string;
        constructor(initName: string) {
            this.name = initName;
        }

        greeting(this: {name: string}){ //thisと引数名と引数の型を書く必要がある。
            console.log(`Hello my name is ${this.name}`)
        }
    }

    const quill = new Person('Quill');

```
このように書くことで、呼び出し先でも、関数にthisが含まれているかどうかとthisの型検査が実施されることになる。

## Classは型にもなりうる
```TypeScript
       class Person {
        name: string;
        constructor(initName: string) {
            this.name = initName;
        }

        greeting(this: Person){ 
            console.log(`Hello my name is ${this.name}`)
        }
    }

    let person2: Person;

```

## private装飾子
クラス内部でしか変更したくない変数の前に半角スペースを空けてprivateと記載。<br>
また、privateをつけた変数はクラスの外から直接参照することもできない。
```TypeScript
    class Person {

    name: string;
    private age: number;　//Personクラス内部でしかage変数にアクセスできない

    constructor(initName: string,initAge: number) {
        this.name = initName;
        this.age = initAge;
    }

    incrementAge() {
        this.age += 1;    
    }

}

```

## public装飾子
デフォルトな状態がpublicなので得に明示的に書く必要がない。

##　クラス初期化
constructor関数の引数にprivateかpublicを明記することで、初期化の記述を簡略化できる。

```TypeScript

    //従来の初期化
    class Person {

        name: string;
        age: number;　//Personクラス内部でしかage変数にアクセスできない

        constructor(initName: string,initAge: number) {
            this.name = initName;
            this.age = initAge;
        }

        incrementAge() {
            this.age += 1;    
        }
    }

    //簡略化した初期化
        class Person {

        constructor(public name: string,private age: number) {
        }

        incrementAge() {
            this.age += 1;    
        }
    }

```

## readonly装飾子
編集させたくない値の装飾子として記載すると、読み取り専用となり、不意に変更されることを防ぐことができる。publicやprivateと併用して記載吸う場合、readonlyを後ろに記載する。<br>
constructor関数を記載する前に宣言した変数でも、constructor内部では変更が可能。


```TypeScript
        class Person {

        constructor(public readonly name: string,private readonly age: number) {
        }

        incrementAge() {
            this.age += 1;    
        }
    }

```

## extends
他のクラスの機能、プロパティなどを継承するために使用。
```TypeScript
        class Person {

        constructor(public readonly name: string,private readonly age: number) {
        }

        incrementAge() {
            this.age += 1;    
        }
    }

    class Teacher extends Person{
        constructor(name: string,age; number,public subject: string){
            super(name,age)
        }
    }

```
あるクラスを継承したクラスの内部で、新しいプロパティを追加したい場合は、下記のように、constructor関数の引数に継承元のクラスで使用されていたプロパティを引数として書き加え、型を指定する必要がある。元々あった引数を書いた後に、新しく追加したいプロパティを引数として同じように追加する。

## protected装飾子
private装飾子をつけたプロパティは、そのプロパティが存在するクラス内部でしか参照、変更できない。extendsで継承した先でも例外なく使用できない。<br>
継承先では参照できるようにしたい場合は、privateではなくprotected装飾子を使用すると実現できる。

## ゲッター
何かの値を参照したときに何かの関数を使用したい場合に使用する。ゲッターは何か値を返す必要がある。ゲッターとセッターは同じ名前でも良いが、同じ名前のゲッターとセッターが返す値の型は同じである必要がある。

```TypeScript
    get subject(){
        return 'something'
    }
```

##　セッター
何かの値を代入する時、変更する時に、何かの処理をしたい場合に使用する。
絶対に1つ以上の引数が必要。
```TypeScript
    set subject(value){
        
    }
```

## static
静的なメソッドを定義することができる。Math.random()のような感覚で使用できる。
```TypeScript
        class Person {

        static species = `Homo sapiens`;
        
        static isAdult(age: number) {
            if (age > 17) return true;
            return false
        }

        constructor(public readonly name: string,private readonly age: number) {
        }

        incrementAge() {
            this.age += 1;    
        }
    }

    console.log(Person.species) //Homo sapiensがコンソールに表示される

```

## abstractクラス
クラスの継承先で使用できるメソッドを保証するために使用する装飾子。<br>
下の例ではTeacherクラスはPersonのgreetingメソッドを継承している。greetingに含まれているthis.explainJobのthisはTeacherクラスのexplainJobを指しているように見えるので、このままでも実行できそうだが、TypeScriptではできない。<br>
この場合、TypeScriptでは継承先にexplainJobというメソッドがあることの確証が得られていないため、実行することができない。
実行するためにabstract装飾子を使用する必要がある。

```TypeScript
    class Person {

        constructor(public readonly name: string,private readonly age: number) {
        }

        greeting(this: Person) {
            console.log(`Hello!My name is ${this.name}.
            I am ${this.age} years old`);
            this.explainJob();
        }    
    }

    class Teacher extends Person {
        explainJob() {
            console.log();
        }
    }
```
継承先でも使用したいメソッドにabstractにつけ、継承元のクラス名の前にもabstractを書くこととする。そうすると、TypeScriptの仕組みがうまく働き、継承先では継承元でabstract装飾子をつけたメソッドが含まれていないとエラーが出るようになる。

```TypeScript
    //変更後

    abstract class Person {

        constructor(public readonly name: string,private readonly age: number) {
        }

        greeting(this: Person) {
            console.log(`Hello!My name is ${this.name}.
            I am ${this.age} years old`);
            this.explainJob();
        }   
        
        abstract explainJob();
    }

    class Teacher extends Person {
        explainJob() {
            console.log();
        }
    }
```
abstractクラスはインスタンスが作成できないため、継承のためだけに作られる。
```TypeScript

    abstract class Person {

        constructor(public readonly name: string,private readonly age: number) {
        }

        greeting(this: Person) {
            console.log(`Hello!My name is ${this.name}.
            I am ${this.age} years old`);
            this.explainJob();
        }   
        
        abstract explainJob();
    }

    let John = new Person //インスタンスを作ることができない。
```

## constructor関数にprivateをつけてシングルトンパターンを実行する方法

constructorにprivateをつけることによって,クラスの外でnewを使用してクラスを作ることができなくなる。シングルトンパターンを実現するときに活用する。シングルトンパターンはクラスからインスタンスをひとつしか作ることができないこと。

```TypeScript
    class Teacher extends Person {

        private static instance: Teacher;

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
```