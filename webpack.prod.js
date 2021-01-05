const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  
  module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin()
  ],
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
    path: path.resolve(__dirname, 'dist') //定义输出文件夹dist路径
  },
  mode: "production"
};