const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './projects/video-player/main.ts',
    resolve: {
        extensions: ['.ts', '.js']
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
    target: 'electron-main',
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin(['projects/video-player/package.json']),
    ],
    watch: true,
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../../dist/video-player'),
    },
};