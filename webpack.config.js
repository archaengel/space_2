const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname,'server.js'),
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'backend.js'
  },
  target: 'node',
  externals: [nodeExternals()]
}
