const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "plugins": [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }, ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'), //定义输出文件夹dist路径
    library: "react-component-transition-in-out",   
    libraryTarget: "umd",
    // libraryTarget: "umd", // 通用模块定义
    // libraryTarget: "umd2", // 通用模块定义
    // libraryTarget: "commonjs2", // exported with module.exports
    // libraryTarget: "commonjs-module", // 使用 module.exports 导出
    // libraryTarget: "commonjs", // 作为 exports 的属性导出
    // libraryTarget: "amd", // 使用 AMD 定义方法来定义
    // libraryTarget: "this", // 在 this 上设置属性
    // libraryTarget: "var", // 变量定义于根作用域下
    // libraryTarget: "assign", // 盲分配(blind assignment)
    // libraryTarget: "window", // 在 window 对象上设置属性
    // libraryTarget: "global", // property set to global object
    // libraryTarget: "jsonp", // jsonp wrapper
  },
  mode: "production"
};