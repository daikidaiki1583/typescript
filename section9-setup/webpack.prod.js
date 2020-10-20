const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode:'production',
    entry: './src/library.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: './dist/'
    },
    devtool:'inline-source-map',
    module: {
        rules:[{
            test:/\.ts$/,
            use:'ts-loader',
            exclude:/node_module/
        }]
    },
    resolve:{
        extensions:['.ts','.js'] 
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}