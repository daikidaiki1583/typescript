# TSでライブラリを使う

## muduleResolution(tsconfig.jsonの設定) 
あるライブラリを使おうと、下記のようにimportしようとするときに、それをどこから探すかの設定をすることができる。

```TypeScript
    import axios from 'axios';
```

設定にはnodeとclassicの選択肢ある。<br>
nodeにすると、node modulesフォルダから探す。<br>
classicにするとカレントディレクトリ内部を探す。<br>
デフォルトの値が何になるかは、tsconfig.jsonのmuduleの選択にてよって変わる。<br>
moduleがES6になっていたら、classicになり、CommonJSになっているとnodeになる。

## .d.tsファイル
JSで作られたライブラリに.d.tsファイルが含まれている場合は、TSでもそのライブラリを使うことができる。
.d.tsファイルは型が定義されたファイル。<br>
もし自分が書いたコードの.d.tsファイルを作成したい場合は、declarationの設定をtrueにしておく必要がある。

##　使いたいライブラリに.d.tsファイルがない場合
誰かが.d.tsファイルを作っていないか調べる。<br>
@types ライブラリ名でググり、ヒットすればTSでも使用できる。
node_modulesの@typesというファイルに入っているd.tsファイルはtypeScriptに考慮されるため、
ググってヒットしたライブラリは@typesに入れておけば、d.tsが考慮され問題なく使用できるようになる。    
```
    npm install --save-dev @types/lodash
```

##　使いたいライブラリに.d.tsファイルがない場合　その2
拡張子を.d.tsにして自作する。

## namespace
TSには値、型、namespace3つのデータの種類がある。これらは同じ名前でも共存できる。
```TypeScript
    let name: string; //値
    interface name {}　//型
    namespace name {}　//namespace
```

下記に例外を列挙。<br>
### namespaceは値として扱った場合は、同じ命名で値と共存できない。

```TypeScript
    let name: string;

    namespace name {
        const first: string = 'Peter';
    }
    //nameという同じ名前のためエラーがでる。
```
### interfaceは同一名でも共存できる。
下記の場合、interfaceは合体される。ただし、同じプロパティ名でも型が異なるとエラーがでる。
```typeScript
    interface name {
        first: string;
    }
    interface name {
        last: string;
    }
    let tmp: name; //firstにもlastにもアクセスできる。
    tmp.first; 
    tmp.last;
```
同名で型違いのメソッドであれば、オーバーロードとして認識される。下に書いたほうが優先的に使用される。
```Typescript
    interface name {
        first(): void;
    }
    interface name {
        first(): number;
    }
    let tmp: name;
    tmp.first();
```
## 型定義ファイル(d.tsファイル)の拡張
自作のd.tsファイルを拡張するには、