# TypeScript コンパイラ

## watchモード

下記のいずれかのコマンドを実行すれば、編集中のtsファイルを保存するたびにjsにコンパイルされる。<br>
中止するには ctrl + c を実施。

```
    tsc index.ts -w
```
```
    tsc index.ts --watch
```

## tsconfig.json
下記のコマンドを実行するとtsconfig.jsonというTypeScriptの設定ファイルが作成される。

``` 
   tsc -init
```

tsconfig.jsonが作成された後、下記のコマンドを実行すると。カレントディレクトリの全てのtsファイルがコンパイルされ、jsファイルが作成される。
```
    tsc
```
tscコマンドを実行した際はtsconfig.jsonを参照してコンパイルが行われる。なお、tsconfig.json作成後に
```
    tsc index.ts
```
のように、ファイルを指定してコンパイルを行うと、それのみがコンパイルされるが、その時tsconfig.jsonの設定は無視される。

### exclude

tsconfig.jsonではコンパイルしたくないファイルを設定することができる。適応範囲はsconfig.jsonと同じ階層にあるファイルのみだが、下記のように*(=ワイルドカード)を使用すると、別の階層にあるファイルを指定することができる。<br>

この設定(include,filesも)作成されたtsconfig.jsonの内部にあるcompilerOptionsの下に書き加えるように書く。

※ワイルドカードが2個の場合<br>
** フォルダ表す

```
    "exclude": [
        "**/compiler.ts", /別の階層にあるcompiler.tsもコンパイルの対象外とするという意味。
        "*.spec.ts",　//末尾が.spec.tsというファイルはコンパイルの対象外とするという意味。
        "node_modules"　//node_modulesは初期設定で除外されているが、明示的に書いておくと良い。
    ]
```

### include

excludeの反対で、コンパイルしたいファイルを設定することができる。
includeとexcludeに同じファイルが指定された場合、excludeが優先される。

```
    include: [

    ]
```

### files
includeと似ており、ここで指定したファイルはコンパイルされる。絶対パスか相対パスで指定する必要があり、ワイルドカードが使用できない。また、excludeとfilesで同じファイルが指定された場合、filesが優先される。

## compilerOptions
下記ではcompilerOptionsの設定について書く。

### target
コンパイルしたいJSのバージョンを書く。

### lib
targetで指定したJSのバージョンにコンパイルされる。そこで指定したJSのバージョンに含まれていない組み込みのライブラリを使用する場合は、libに明示的に書き加える必要がある。
https://qiita.com/ryokkkke/items/390647a7c26933940470#lib

### allowJs
Jsファイルをコンパイルの対象とすることができる。

### checkJs
JsファイルもTypeScriptのようにチェックをすることができる。allowJsを使用する時に限り使用する。

### jsx
Reactを使うときに使う設定。

### declaration　declarationMap
.d.tsファイルが作成される。書いたコードの型情報が含まれる。<br>
ライブラリを作ったとしたら、それのドキュメント(説明書き)のような存在になる。

### sourceMap　
JavaScriptとTypeScriptの架け橋のような役割。
ブラウザでTypeScriptファイルを見たいときに使用する。
コンソールのSourceでTSファイルを見ることができる。

### outDir
ここで指定したフォルダにコンパイルされたJSファイルが吐き出される。下記の設定の場合、カレントディレクトリに存在するTSファイルがコンパイルされ、distフォルダにJSファイルが吐き出される。

### rootDir
コンパイル結果をoutDirで出力する際に、どのフォルダのファイルをコンパイルするかを指定することができる。このとき、include,filesなどでコンパイル対象に指定したファイルが、outDirで指定したフォルダの外に1つで存在するとエラーが出る。

### removeComments
コメントの記載を除去できる。

### noEmit
この設定を使用すると、何も出力されない。型チェックだけを行いたい時に使用する。

### noEmitOnError
この設定をtrueにするとコードにエラーがあると、コンパイルが行われずファイルが生成されない。

### downlevelIteration
for...ofのような繰り返し処理を含むコードはES3やES5にコンパイルできない可能性を含んでいる。デフォルトではこの設定はfalseになっているが、繰り返し処理を含むコードがコンパイルできない場合この設定を変更するとうまくいくかもしれない。

## strict

strictをtrueにした場合、下記の設定を全て有効にすることができる。
```
// "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
```

### noImplicitAny
関数の引数に型注釈していない場合anyになるが、そうなった場合にエラーを出すように設定できる。あえてanyとして指定した場合や、変数に型注釈しない場合はエラーがでない。

### strictNullChecks
通常、strictやnumberを指定した変数にnull,undefinedに含むことはできるが、この設定をtrueにした場合は含むことができないようにできる。trueにした場合でも、nullやundefinedを含みたい場合は、union型で明示的に書く必要がある。<br>
下記のようにunion型で指定した関数の返り値はnullである可能性を含むため、そのままではstringとして扱えない。<br>
if文で書くと、nullにフィルターをかけるようなことができる。
```TypeScript
    function echo(message: string): string | null {
        return message;
    }
    let nullablemessage = echo('hi');
    // nullablemessage.toUpperCase 
    //  ↑　nullである可能性があるためstringとして扱えない
    
    if (nullablemessage) {
        nullablemessage.toUpperCase();
    }

    //上のように
```

### strictBindCallApply 