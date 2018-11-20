const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'electron-main',
  entry: './projects/video-player/main.ts',
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@common': path.resolve(__dirname, '../common')
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
  plugins: [new CopyWebpackPlugin(['projects/video-player/package.json'])],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/video-player')
  }
};
