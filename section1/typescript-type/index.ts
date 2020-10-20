let hasVlaue = true;
let count = 10;
let float = 3.14;
let negative = -0.1;
let single = 'hello';
let double = "hello";
let back = `hello`;

//型推論　変数に代入した値などによって型を推論する機能
//型注釈　変数に型を指定すること。

//オブジェクトの書き方
const person: {
    name: string;
    age: number;
} = {
    name:'Jack',
    age: 21
}

//array型

const fruits: string[] = ['apple','banana','grape'];
const fruits2 = ['apple','banana','grape',2];

/**
* tuple型　配列の位置毎に型を指定することができる
*          配列に追加することができる値の数を制限することはできないが、
*          初めに型注釈した数より後の値は参照できない。
*/
const book: [string,number,boolean] = ['buisness',1500,false];

/**
 * Enum  列挙型という。
 * 　　　　いくつかの特定の文字列を
 * 　　　　型として指定することができる。
 * 　　　　Excelの「データの入力規則」のようなイメージ
 * 　　　　オブジェクトのプロパティに、
 * 　　　　必ずしも文字列や値を定義しなければいけないことはなく。
 * 　　　　その場合、プロパティ名に0から数字が割り当てられる。
 */

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

 coffee.size = CoffeeSize.SHORT;

 //any型はどんな方のものでも受け入れる。

 //union型 1つの変数、配列に複数の型を指定することができる

 let unionType: number | string = 10;
 let unionType2: (number | string)[] = [21,'test']　//配列の場合の書き方

 /**
  *  literal型 文字列を型として使える。
  *            constで定数を作成した場合は自動的にリテラル型となるため、
  *            型注釈する必要がない。
  *            union型と組み合わせるとenumのように使える
  */

 let grape: 'grape' ;
 const apple = 'apple';

 let clothsize: 'small' | 'medium' | 'large' = 'large';

 /**
  * typeエイリアス　変数を型として扱える。
  */

  type ShoesSize = 'small' | 'medium' | 'large';
  let shoes: ShoesSize = 'small';

  /**
   *  関数に型を適用させる
   *  引数には必ず型注釈を行うようにする。そうでなければany型になってしまいTypeScriptの恩恵がなくなるため
   *  返り値は型注釈をしなくても良いが、やった方がコードの可読性があがったり、tscのチェックが入るためやったほうが良い。
   *     */


   function add(num1: number,num2: number):number {
       return num1 + num2
   }

   /**
    * void型　返り値として何も返さない関数に型注釈をするときに使用する。
    */

    function sayHello(): void{
        console.log('Hello');
    }

    //アロー関数に型注釈をする方法

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

    // unknown型
let unknownInput: unknown;
let anyInput: any;
let text: string;

unknownInput = 21;
unknownInput = true;
unknownInput = 'hello';
anyInput = 'hello';
text = anyInput
//text = unknownInput  
/**
 *unknown型の変数にはどんな値も代入できるが、
 * 何らかの値が入ったunknown型の変数は他の変数に代入することができない。
 * any型だとどちらもできる。
 */

 if (typeof unknownInput === 'string') {
    console.log('yes')
    console.log(unknownInput)
 } else {
     console.log(unknownInput)

 }

 //never型