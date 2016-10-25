var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: "./src/js/page/index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "js/bundle.js", //可以用[id], [name], [hash]
        chunkFilename: "js/bundle.chunk.js"
    },
    module: {
        loaders: [ //加载器
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            }, {
                test: /\.html$/,
                loader: "html"
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
        ]
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        // new webpack.DefinePlugin({
        //     'process.env': env
        // }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery'
        }),
        new ExtractTextPlugin("css/bundle.css"), //单独使用style标签加载css并设置其路径
        new webpack.optimize.UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            /* *
            // title: 用来生成页面的 title 元素
            // filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
            // template: 模板文件路径，支持加载器，比如 html!./index.html
            // inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            // favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
            // hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
            // cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
            // minify: {} | false , 传递 html-minifier 选项给 minify 输出
            // showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
            // chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
            // chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
            // excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) 
            * */

            title: "this is a test",
            filename: '/index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            favicon: './src/img/favicon.ico', //favicon路径
            hash: true, //为静态资源生成hash值

            minify: { //压缩HTML文件
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
                //removeAttributeQuotes: true  //移除引号
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
    ],
    devServer: { //开启
        contentBase: './dist'
    }
};