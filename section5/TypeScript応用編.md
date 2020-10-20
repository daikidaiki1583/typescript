# TypeScript応用

## &
ことなる型を同時に適応させることができる。

```TypeScript
    interface Engineer {
    name: string,
    role: string
    }

    interface Blogger {
        name: string,
        follower: number
    }

    type EngineerBlogger = Engineer & Blogger;
    
    //この書き方でも同じ意味になる。
    interface EngineerBlogger2 extends Engineer,Blogger {}
```

```typescript
    type NumberBoolean = number | boolean;
    type StringNumbar = string | number;
    type Mix = NumberBoolean & StringNumbar;  //number型になる。
```

## in演算子
オブジェクトが持つ型の情報を元に条件分岐の処理を行う時に使う演算子。<br>
describeProfile関数の引数として与えられたオブジェクトにroleというプロパティが含まれているかどうかを判断する。その条件に合致した場合は。オブジェクトがもつその他のプロパティにアクセスすることができる。

```TypeScript
    
    interface Engineer {
        name: string,
        role: string
    }

    interface Blogger {
        name: string,
        follower: number
    }
   
    type NomadWorker = Engineer | Blogger;
    
    function describeProfile(nomadWorker: NomadWorker){
    console.log(nomadWorker.name);
    if (`role` in nomadWorker) {
        console.log(nomadWorker.role)
    }
}

```

## instanceof
classのインスタンスが持つ型の情報をもとに条件分岐をしたいとき使用。
```TypeScript
    class Dog {
        speak(){
            console.log('bow')
        }
    }

    class Bird {
        speak() {
            console.log('twee')
        }
        fly() {
            console.log('patapta')
        }
    }

    type Pet = Dog | Bird;
    function havepet(pet: Pet){
            pet.speak();
        if (pet instanceof Bird){　//petがBirdから作成されたインスタンスであれば次の処理を実行
            pet.fly();
        }

    }
```
## タグ付きunion
リテラル型を利用してクラスにタグ付けのようなことができ、それを利用するとswitch文での条件分岐がやりやすくなる。
```TypeScript
    class Dog {
        kind: 'dog' = 'dog'
        speak(){
            console.log('bow')
        }
    }

    class Bird {
        kind: 'bird' = 'bird'
        speak() {
            console.log('twee')
        }
        fly() {
            console.log('patapta')
        }
    }

    type Pet = Dog | Bird;
    
    function havepet(pet: Pet){
    
    switch (pet.kind) {
            case 'bird':
                pet.fly()
        }
    
    }
```

## 型アサーション
手動で型を上書きする方法。<br>
TypeScriptではhtmlのclass名、id名などの文字列が存在するかどうかを判断できないため、下の例だとnullになる可能性が含まれる。(※2020/9/26現在のvscodeでは型推論でnullが出ない)

```TypeScript
    const input = document.getElementById('input') as HTMLInputElement;　
    //型アサーションをしなければHTMLElement型だと判断されるが、型アサーションを行うとHTMLInputElement型だと判断される。

```

## ! non null assertion operator
型推論でnullである可能性が含まれる場合、!をつけるとnullである可能性をなくすことができる。

```TypeScript
    const input = document.getElementById('input')!; 
    //document.getElementById('input')はnullじゃない!!
```
## インデックスシグニチャー
予めインデクスシグニチャーが無いinterfaceなどで型注釈されたオブジェクトには、プロパティと値を追加できない。
```TypeScript
    
    interface Designer {
        name: string;
    }

    const designer: Designer = {
        name:'Quill'
        role:'web' //Designer型はnameしか許さないためエラーになる
    }

```
下記のようにインデクスシグニチャーを書き加えておくことで、任意のプロパティ、値を追加できるようになる。<br>
indexという文字列は特に何でもよい。大事なの角括弧[]とコロン:を決まったように書くこと。

```TypeScript
    
    interface Designer {
        name: string;
        [index: string]: string; //こうすることで文字列のプロパティと文字列の値を追加できるようになる。
    }

    const designer: Designer = {
        name:'Quill'
        role:'web' 
    }

```


## 関数のオーバーロード
関数の返り値をTypeScriptに正しく伝える方法。TypeScriptは関数の返り値が何になるかを判別することができない。

```TypeScript
    function toUpperCase(x: string | number) {
        if (typeof x === 'string') {
            return x.toUpperCase();
        }
        return x;
    } 

    const upperHello = toUpperCase('hello') //型推論はstring | numberになる
```
関数の上の行に、その関数と同じ関数を書き型注釈する。

```TypeScript

    //追加　関数のオーバーロード 
    function toUpperCase(x: string): string; 
    function toUpperCase(x: number): number; 
    
    function toUpperCase(x: string | number) {
        if (typeof x === 'string') {
            return x.toUpperCase();
        }
        return x;
    } 

    const upperHello = toUpperCase('hello') //型推論はstringになる。
```
オーバーロードを書いた時点で、本体の関数の引数と返り値の型注釈は無視される。
```TypeScript
    function toUpperCase(x: string): string; 

    function toUpperCase(x: string | number) {
        if (typeof x === 'string') {
            return x.toUpperCase();
        }
        return x;
    } 

    const upperHello = toUpperCase(23) 
    //本体の関数にかかれている型注釈はここでは無視される。
    //numberのオーバーロードがないためエラーになる。

```
```TypeScript
    function toUpperCase(x: number): number; 
    
    function toUpperCase(x: string | number) {
        if (typeof x === 'string') {
            return x.toUpperCase();
        }
        return x;
    } 

    const upperHello = toUpperCase('Hello') 
    //本体の関数にかかれている型注釈はここでは無視される。
    //stringのオーバーロードがないためエラーになる。

```
## Optional Chaining
<br>

## nullish coalescing
変数などがnullかundefinedである場合に、指定した値を代入することができる。
```TypeScript
    interface DownloadedData {
        id: number;
        user?: {
            name?: {
                first: string;
                last: string;
            }
        }
    }
    const downloadedData: DownloadedData = {
        id: 1
    }

    const  userData = downloadedData.user ?? 'no-user';
```

## Lookup型

オブジェクトの型(interfaceやclass型、typeエイリアス)のプロパティの型にアクセスしてそれを別のところで使用する方法。

```TypeScript
    interface DownloadedData { //classでもtypeエイリアスでも可
        id: number;
        user?: {
            name?: {
                first: string;
                last: string;
            }
        }
    }
    
    type id = DownloadedData['id']
    const test: id = 3231;　//変数のtestの方はnumberになる。
    
```

## 型の互換性

### enum と　number
number型の変数にenumを入れることができる。<br>
enumにnumber型の変数を入れることができる。<br>
enumとnumber型は互換性あり。
```TypeScript
    enum Color {
        RED,
        BLUE
    }
    let target = 0;
    let source = Color.RED;
    target = source; //代入可能
    source = target;

```

### 関数型と関数型

【公式】型の互換性について
https://github.com/microsoft/TypeScript/blob/master/doc/spec-ARCHIVED.md
```TypeScript
    let target = function (a: string, b: string) {}
    let source = function (a: string) {}
    target = source; //代入できる。
```

```TypeScript
    let target = function (a: string) {}
    let source = function (a: string, b: string) {}
    target = source; //エラー
```
引数が1つしか持たないtargetに、引数を2つ持つsourceは代入できない。

```TypeScript
    let target = function (a: string) {}
    let source = function (a: string, b?: string) {}
    target = source; //エラー
```
引数bに?をつけるとstringはあってもなくても良いという意味になるため、エラーは起きない。

## + operator
https://github.com/microsoft/TypeScript/blob/master/doc/spec-ARCHIVED.md#4192-the--operator

## 関数型のオーバーロードはinterfaceで定義する
関数の引数はオーバーロードで列挙した型をUnion型で全て含むようにする。
```TypeScript
    interface TmpFunc {
        (x: string): string;
        (x: number): number;        
    }
    const upperHello: TmpFunc = function (x: string | number) {
        return 0
    };
```

## 関数型のインターセクション(&)
```TypeScript
    interface FuncA {
        (a: number,b: string): number;
        (a: string,b: number): number;
    }

    interface FuncB {
        (a: string): number;
    }

    let interSectionFunc: FuncA & FuncB;
    //FuncAの型とFUncBの型がオーバーロードされた状態と同じ。
    
    interSectionFunc = function(a: number | string, b?: number |string) {return 0}
    //FuncBには引数が1つしかないため、2つ目の引数には?をつけておく。?はあってもなくても良いという意味。

```

## 関数型のユニオン型は引数がインターセクションに、返り値はユニオン型になる。
```TypeScript

    interface FuncA {
        (a: number,b: string): number;
    }
    
    interface FuncB {
        (a: string): string;
    }

    let unionFunc: FuncA | FuncB;
    //変数にunionFuncにはFuncAの型の関数も入れられるし、FuncBの型の関数もいれられる。

    unionFunc =function (a: string) {return 'hi'}　//FuncBの型
    unionFunc("sa") //2個めの引数をいれようとするとエラーになる

    unionFunc =function (a: number) {return 21}　//FuncAの型
    unionFunc(1,"sa")
```

## レストパラメーター
```JavaScript
    function advancedFn(...arg){ //引数を何個でも関数の中で配列として使用できる。
        arg[0]
    }
    advancedFn(0,23,4,6)
```
レストパラメーターには配列の型注釈が使用できる。
```TypeScript
    function advancedFn(...arg: number[]){ 
        arg[0]
    }
    advancedFn(0,23,4,6)
```

taple型を使用して型注釈もできる。この場合、引数の数は指定した型の数しか使用できなくなる。下の場合は3つまで。
```TypeScript
    function advancedFn(...arg: [number,string,boolean]){ 
    }
    advancedFn(0,'test',true)
```
taple型において、下記の関数の4つ目の引数のように書くと、引数の4つ目以降に数字を何個でも入れることができる。
```TypeScript
    function advancedFn(...arg: [number,string,boolean,...number[]]){ 
    }
    advancedFn(0,'test',true,331,3,21,5,6)
```

```TypeScript
      //3つ目の引数に?をつけることもできるが、この場合3つめの引数(この場合boolean)を指定しないと4つ目以降に引数が使えない。
    
    /
    function advancedFn(...arg: [number,string,boolean?,...number[]]){ 
    }
    advancedFn(0,'test',331,3)　//この場合エラーになる。
  
```

### 配列とtaple型のreadonly書く場合ここに書く。

```TypeScript
    
    function advancedFn(...arg: readonly [number,string,boolean?,...number[]]){ 

    }

    function advancedFn(...arg: readonly number[]]){ 

    }

```
## constアサーション
```TypeScript
    const array = [10,20] as const 
    
    const Peter = {
        name: 'Peter',
        age: 38
    } as const 
    //readonlyと同じく読み取り専用となり、型も値と同様になる。(この場合nameの方はPeterになり、ageの型は38になる)

```

## typeofの便利な使い方
typeofに続いてオブジェクトなどの値を入れることにより、そのオブジェクトの型を他の変数などに代入することができる。
```TypeScript
    const Peter = {
        name: 'Peter',
        age: 38
    } 

    type PeterType = typeof Peter; 
    //この場合PeterTypeの方はname: string,age: number　になる。 
```