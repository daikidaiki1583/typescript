# interfaceについて
## interface
オブジェクトのみのタイプエイリアス。タイプエイリアスは何にでも使用できるがinterfaceはオブジェクトにしか使用できない。<br>intefaceをみたらオブジェクトを示すものだということが分かりやすい。

### タイプエイリアス=型の変数

```TypeScript
    type Human = {
        name: string;
        age: number;
    }   
    
    const human: Human = {
        name:'Quill',
        age:38
    }

    let developer: Human;
```

interfaceに書き換えると
```TypeScript
    interface Human {
        name: string;
        age: number;
    }
```
## メソッドをオブジェクトの型に指定する方法
```TypeScript
    interface Human {
    
    name: string;
    age: number;
    greeting(message: string): void;
    
    }

    const human = {
        name: 'Quill',
        age: 38,
        greeting(message: string) {
            console.log(message);
        }
    }
```

## implementsを使用してclassに対してinterfaceの条件を適応させるための方法
classとinterfaceを同時につかうためにimplementsを使用する。

```TypeScript

    interface Human {
        name: string;
        age: number;
        greeting(message: string): void;
    }

    class Developer implements Human {
        constructor(public name: string,public age: number){}
        greeting(message: string) {
            console.log('hi')
        }
    }
   
```

implements Human とすることで、指定したclassが生成するインスタンスがもつオブジェクトの形がinterface Humanで決めた型を全て含むようにさせられる。implementsは複数指定できる。intarfaceの代用としてtypeエイリアスを使うことも可能。    

## interfaceのreadonly
interfaceにreadonlyは使用できるが、publicやprivateは使用できない。readonlyをつけた特定のプロパティは読み込みしか許されないが、interfaceに何か代入してまるごと違うものに置き換える時は書き換えることができる。<br>
readonlyを含むinterfaceをimplementsでclassに適応させた場合、そのinterface内でreadonly指定されたプロパティは、必ずしもそのclass内でもreadonlyである必要はない。下記の例ではprivateはエラーになった。


```TypeScript
interface Human {
    readonly name: string;
    age: number;
    greeting(message: string): void;
}

class Developer implements Human {
    constructor(public name: string,public age: number){}
    greeting(message: string) {
        console.log('hi')
    }
}
```

## interfaceのextends
interface同士はextendsできる。
```TypeScript
    
    interface Nameable {
        name: string;
    }

    interface Human extends Nameable {
        age: number;
        greeting(message: string): void;

    }

    class Developer implements Human {
        constructor(public name: string,public age: number){}
        greeting(message: string) {
            console.log('hi')
        }
    }

```
extendsするinterfaceに同じ名前のプロパティがあった場合、extendsする方のプロパティの型に、enxtendされる方の型が代入できるときに限り、成立する。下記のようにstrign型にnumber型を代入しようとするとできない。

```TypeScript
    interface Nameable {
        name: string;
    }

    interface Human extends Nameable {
        name: number;
        greeting(message: string): void;

    }
```

## interfaceで関数型を表現
タイプエイリアスでの関数の型注釈。
```TypeScript
    type addFunc = (num1: number,num2: number) => number;
    
    let addFunc: addFunc;
    addFunc = (n1: number,n2: number) => {
        return n1 + n2
    }

```
interfaceでの関数の型注釈。オブジェクトのように見えるので、タイプエイリアスで書くほうが見ためで分かりやすい。こんな書き方もあるという認識くらいでよい。
```TypeScript
    interface addfunc {
        (num1: number,num2: number): number;
    }
```
## ? ←あってもなくても良いというオプション
プロパティ、メソッド、引数につけることができ、つけられたそれらはあっても無くてもよいことになる。<br>
intefaceのプロパティの直後に?をつけることによって、そのinterfaceが型として指定されたオブジェクトではその値を含まなくてもエラーがでることがない。
```TypeScript
    interface Nameable {
        name: string;
        nickName?: string;
    }

    const john: Nameable = {
        name:'john'
    }
```
通常はclassにフィールドを追加する時はconstructor関数で初期化する必要があるが、classのフィールドに?をつけると初期化が必要なくなる。そのフィールドはundefinedとして扱われる。<br>
下記のようにnameフィールドに?をつけて、かた、constructor関数の引数として別の変数(initName)を初期化して、そちらにも?をつけておく。こうすることでinitNameがある場合にのみ、name変数に値が代入される。<br>
constructor関数の引数に?をつける場合は最後尾にもってくるようにする。

```TypeScript

    class Developer2 {
        name?: string;
        constructor(public age: number,initName? :string){}
        if (initName) {
            this.name = initName
        }
    }

```
下記のname変数はstring型かundefinedになることを求められるという意味だが、2つの例は同義ではない。<br>
上の例ではnameが無くてもエラーにならないが、下の例ではnameがないとエラーが出るしくみになっているため。
```TypeScript
    interface Nameable {
        name?: string
    }

    interface Nameable {
        name: string | undefined  
    }

```
