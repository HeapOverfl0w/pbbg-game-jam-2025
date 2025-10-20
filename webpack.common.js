const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: {
        loader: 'ts-loader'
      },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/'
        }
      },
    },
  ]},
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      serveIndex: true
    }  
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
 plugins: [htmlPlugin]
};