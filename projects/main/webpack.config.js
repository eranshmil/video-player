const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'electron-main',
  entry: './projects/main/src/main.ts',
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@common': path.resolve(__dirname, '..', 'common'),
      '@main': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CopyWebpackPlugin(['projects/main/package.json'])],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/main')
  }
};
