# TypeScript　型

JSと同様boolean,string,numberなどがある。

```TypeScript
let hasVlaue: boolean = true;
let count: number = 10;
let float: number = 3.14;
let negative: number = -0.1;
let single: string = 'hello';
let double: string = "hello";
let back: string = `hello`;
```
## 型注釈　
変数に型を指定すること。<br>
書き方は上記のように、変数名の直後にコロン(:)をつけて、半角スペースを入れ、型名を記入。


## 型推論　
変数に代入した値などによって型を推論する機能。<br>
上記の型注釈は省略することができ、その場合、代入された値から方が推論され決定される。


## オブジェクトに型をつける
オブジェクトのプロパティ毎に型を指定することができる。

```TypeScript
const person: {
    name: string;
    age: number;
} = {
    name:'Jack',
    age: 21
}
```

## Array型
変数名の後に、:(コロン)をつけ、半角スペースを空け、型を記入。型名の後に角括弧[]をつけるとArray型として指定できる。<br>
こちらも型注釈を省略することができ、そうすると型推論が行われる。

```TypeScript
    const fruits: string[] = ['apple','banana','grape'];
    const fruits2 = ['apple','banana','grape',2];
```
##  tuple型　

配列の位置毎に型を指定することができる。<br>
予め指定した型の数以上に配列に値を追加することができるが、
初めに型注釈した数より後の値は後から参照できない。<br>
下記コードは配列の0番目は文字列、1番目は数値、2番目はブーリアンとするという意味。

```TypeScript
    const book: [string,number,boolean] = ['buisness',1500,false];
```

## Enum  
列挙型という。
いくつかの特定の文字列を型として指定することができる。
Excelの「データの入力規則」のようなイメージ
オブジェクトのプロパティに、必ずしも文字列や値を定義しなければいけないことはなく。その場合、プロパティ名に0から数字が割り当てられる。<br>
https://typescript-jp.gitbook.io/deep-dive/type-system/enums

```TypeScript
     enum CoffeeSize {
     SHORT,
     TALL,
     GRANDE,
     VENTI
    }

     const coffee = {
     hot:true,
     size:CoffeeSize.TALL
    }
```

 ## any型
 どんな型のものでも受け入れる。TypeScriptの特徴である型を無視するものなので極力使用しないようにする。

 ## union型
1つの変数、配列に複数の型を指定することができる。

```TypeScript
     let unionType: number | string = 10;
     let unionType2: (number | string)[] = [21,'test']　//配列の場合の書き方

```

## literal型 
文字列を型として使える。<br>
constで定数を作成した場合は自動的にリテラル型となるため型注釈する必要がない。union型と組み合わせるとenumのように使える

```TypeScript
    const apple = 'apple';
    let clothsize: 'small' | 'medium' | 'large' = 'large';
```

## typeエイリアス　
変数を型として扱える。

```TypeScript
  type ShoesSize = 'small' | 'medium' | 'large';
  let shoes: ShoesSize = 'small';
```

## 関数に型を適用させる
引数には必ず型注釈を行うようにする。そうでなければany型になってしまいTypeScriptの恩恵がなくなるため。返り値は型注釈をしなくても良いが、やった方がコードの可読性があがったり、tscのチェックが入るためやったほうが良い。
   
```TypeScript
   function add(num1: number,num2: number):number {
       return num1 + num2
   }
```

```TypeScript

```

## アロー関数に型注釈をする方法

```TypeScript
   const anotherAdd: (n1: number,n2: number) => number = function (num1: number,num2: number):number {
        return num1 + num2
    };
    
    const doubleNumber = (num1: number):number => num1 *2;

    function doubuleAndHandle(num: number,cb: (num: number) => void):void {
        const doubleNum = cb(num * 2);
        console.log(doubleNum);
    }

    doubuleAndHandle(21, doubleNum => {
        return doubleNum
    })
```
 


## void型　
返り値として何も返さない関数に型注釈をするときに使用する。

```TypeScript
    function sayHello(): void{
        console.log('Hello');
    }

```


## unknown型
 unknown型の変数にはどんな値も代入できるが、 何らかの値が入ったunknown型の変数は他の変数に代入することができない。

```TypeScript
    let unknownInput: unknown;
    let anyInput: any;
    let text: string;

    unknownInput = 21;
    unknownInput = true;
    unknownInput = 'hello';
    anyInput = 'hello';
    text = anyInput
    //text = unknownInput  unknown型の変数は他の変数に代入できない

```
unknown型は下記のようにtypeofで型を判別して、条件分岐することができる。
```TypeScript
    if (typeof unknownInput === 'string') {
        console.log('yes')
        console.log(unknownInput)
    } else {
        console.log(unknownInput)
    } 
```
## never型
値を持たない型。
最後まで到達しない関数はnever型の返り値となる。
https://qiita.com/macololidoll/items/1c948c1f1acb4db6459e
https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#never%E5%9E%8B


```TypeScript
    function infiniteloop(): never {
        while (true) {

        }
    }
```

void型は、実行完了した上で何も返さない関数に対して設定する型。