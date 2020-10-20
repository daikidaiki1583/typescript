var hasVlaue = true;
var count = 10;
var float = 3.14;
var negative = -0.1;
var single = 'hello';
var double = "hello";
var back = "hello";
//型推論　変数に代入した値などによって型を推論する機能
//型注釈　変数に型を指定すること。
//オブジェクトの書き方
var person = {
    name: 'Jack',
    age: 21
};
//array型
var fruits = ['apple', 'banana', 'grape'];
var fruits2 = ['apple', 'banana', 'grape', 2];
/**
* tuple型　配列の位置毎に型を指定することができる
*          配列に追加することができる値の数を制限することはできないが、
*          初めに型注釈した数より後の値は参照できない。
*/
var book = ['buisness', 1500, false];
/**
 * Enum  列挙型という。
 * 　　　　いくつかの特定の文字列を
 * 　　　　型として指定することができる。
 * 　　　　Excelの「データの入力規則」のようなイメージ
 * 　　　　オブジェクトのプロパティに、
 * 　　　　必ずしも文字列や値を定義しなければいけないことはなく。
 * 　　　　その場合、プロパティ名に0から数字が割り当てられる。
 */
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize[CoffeeSize["SHORT"] = 0] = "SHORT";
    CoffeeSize[CoffeeSize["TALL"] = 1] = "TALL";
    CoffeeSize[CoffeeSize["GRANDE"] = 2] = "GRANDE";
    CoffeeSize[CoffeeSize["VENTI"] = 3] = "VENTI";
})(CoffeeSize || (CoffeeSize = {}));
var coffee = {
    hot: true,
    size: CoffeeSize.TALL
};
coffee.size = CoffeeSize.SHORT;
//any型はどんな方のものでも受け入れる。
//union型 1つの変数、配列に複数の型を指定することができる
var unionType = 10;
var unionType2 = [21, 'test']; //配列の場合の書き方
/**
 *  literal型 文字列を型として使える。
 *            constで定数を作成した場合は自動的にリテラル型となるため、
 *            型注釈する必要がない。
 *            union型と組み合わせるとenumのように使える
 */
var grape;
var apple = 'apple';
var clothsize = 'large';
var shoes = 'small';
/**
 *  関数に型を適用させる
 *  引数には必ず型注釈を行うようにする。そうでなければany型になってしまいTypeScriptの恩恵がなくなるため
 *  返り値は型注釈をしなくても良いが、やった方がコードの可読性があがったり、tscのチェックが入るためやったほうが良い。
 *     */
function add(num1, num2) {
    return num1 + num2;
}
/**
 * void型　返り値として何も返さない関数に型注釈をするときに使用する。
 */
function sayHello() {
    console.log('Hello');
}
//アロー関数に型注釈をする方法
var anotherAdd = function (num1, num2) {
    return num1 + num2;
};
var doubleNumber = function (num1) { return num1 * 2; };
function doubuleAndHandle(num, cb) {
    var doubleNum = cb(num * 2);
    console.log(doubleNum);
}
doubuleAndHandle(21, function (doubleNum) {
    return doubleNum;
});
// unknown型
var unknownInput;
var anyInput;
var text;
unknownInput = 21;
unknownInput = true;
unknownInput = 'hello';
anyInput = 'hello';
text = anyInput;
//text = unknownInput  
/**
 *unknown型の変数にはどんな値も代入できるが、
 * 何らかの値が入ったunknown型の変数は他の変数に代入することができない。
 * any型だとどちらもできる。
 */
if (typeof unknownInput === 'string') {
    console.log('yes');
    console.log(unknownInput);
}
else {
    console.log(unknownInput);
}
