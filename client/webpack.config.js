const path = require ('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin ({
  template: './src/index.html',
  filename: './index.html',
})

module.exports = {
  output: {
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join (__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    proxy: [{
      context: ['/config.js', '/api'],
      target: 'http://localhost:5000',
    }],
  },
  plugins: [htmlPlugin],
}
