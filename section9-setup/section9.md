# section9

## 4つのimport
括弧付き。
```TypeScript
    import { Foodsable } from './foods.js';
```
名前をつける。
```TypeScript
    import { Foodsable as FoodList } from './foods.js';
```

全てimportして、asで名前をつけ、その名前を使う。
```TypeScript
   import * as Foods from './foods.js'; 
```
括弧なしで自由に命名。この場合、exportはexport defaultでなくてはならない。
```TypeScript
    import  foo from './foods.js'; 
```

## webpack使い方
まず、npmを使えるようにする。下記コマンドを打てば、package.jsonが作られる。
```
    npm init -y
```
npmを使って,webpackとwebpack-cliをインストール。
```
    npm install --save-dev webpack webpack-cli
```
その後に、webpack.config.jsを作成する。手動で構わない。<br>
webpackはこのファイルの設定をも元に作業を行う。
```
    module.exports = {

    }
```

## webpack.config.jsの書き方
### entry
webpackがどのファイルから読み込みを始めるかを指定。
```typeScript
    module.export = {
        entry: './dist/main.js'
    }
```

### output
オブジェクトの形で書く。下記のpathの書き方はwebpackでは一般的。
```typeScript 
    const path = require('path);
    module.export = {
        entry: './dist/main.js'
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname,'dist')
        }
    }

```
```typeScript
    __dirname //カレントディレクトリの絶対パスを文字列で返す。
```
```typeScript
    path.resolve(__dirname,'ディレクトリ名') 
    //windowsなどでパスの区切りがスラッシュでない場合でも問題なく使用でき、汎用性が高いためpath.resolveの形で使いたい。
```

### mode
バンドルされるファイルの見た目が変わる。<br>
developmentにすると見やすくなる。productionにすると1行にまとめられ最適化されたコードになる。d
package.jsonのscriptsに-configを書き加え、startとbuildで参照するwebpack設定ファイル(webpack.dev.jsやwebpack.prod.js)を別にすることができる。<br>

CleanWebpackPlugin バンドルするたびに指定されたファイルだけが残るようにdistフォルダが整理される。

### バンドル
複数のファイルを1つのファイルにバンドルするためにnpmのコマンドでwebpackを実行する必要がある。<br>
そのためにはpackage.jsonのscriptでエイリアスを作成しておく。ここではbuildにしているが文字列はなんでもよい。
```Javascript
    {
        ～省略～,
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        ～省略～,
    }

```

## sourcemap
webpack.config.jsで設定できる。
https://webpack.js.org/configuration/devtool/

## ts-loader (TSローダー) resolve.extensions
ts-loaderなしの場合、tsをtscコマンドでjsにして、それをバンドルする必要があるが、ts-loaderを使用すると、複数のtsファイルから直接1個のjsファイルにバンドルすることができる。<br>
コマンドラインで下記を実行してte-loaderをインストール。同時にtypescriptもインストールが必要。
```
    npm install --save-dev ts-loader typescript    
```
webpack.config.jsのmoduleというプロパティを書き加え、module(ファイル)の扱いかたのルールを書いておく。

```javascript
    const path = require('path');

    module.exports = {
        entry: './dist/main.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname,'dist')
        },
        devtool:'inline-source-map',
        module: {
            rules:[{
                test:/\.ts$/, //tsファイルをバンドルの対象とする。
                use:'ts-loader', //使用するローダーを記載。
                exclude:/node_module/　//node_moduleは無視する。
            }]
        },
        resolve:{
            extensions:['.ts','.js'] 
            //あるファイルで別のファイルをimportするときに、ファイルの拡張子が指定されていない場合、
            //配列で指定された拡張子の順番でファイルを探すことができる。
        }
    }

```

## webpack-dev-server
これを使うと編集中のtsファイルを保存するたびに、変更がバンドルファイルの反映され、開発が効率的にできる。<br>

package.jsonのscriptにてエイリアスを作成し、コマンドをうつと起動される。(下記の場合はnpm run start)
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start":"webpack-dev-server"
  },

```
webpack-dev-serverは変更は即座に反映されるが、その変更はwebpack内部で保存され、フォルダでは確認することができない。

