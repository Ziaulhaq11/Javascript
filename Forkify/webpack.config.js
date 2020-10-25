const path = require('path');   
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : ['./src/js/index.js'],   //The webpack looks first to bundle
    output : {
        path : path.resolve(__dirname, 'dist'),   //dirname is current directory and we are joining it with path we are storing the output.
        filename : 'js/bundle.js'
    },
    //mode : 'development'
    devServer : {
        contentBase : './dist'  //so we are setting a path
    },
    plugins: [
        new HtmlWebpackPlugin({ //it will automatically include the bundle.js in the script.
            filename: 'index.html',
            template: './src/index.html'   //The template is the source of the file which we need to copy. & when we use devServer it will not store files on dist folder it will stream on the browser only.
        })
    ],
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            }
        ]
    }
}