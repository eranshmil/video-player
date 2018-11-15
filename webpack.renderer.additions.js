const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader', path.resolve('./angular2-template-loader.js')],
        exclude: [/node_modules/]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // angular 2 templates break if these are omitted
            removeAttributeQuotes: false,
            keepClosingSlash: true,
            caseSensitive: true,
            conservativeCollapse: true
          }
        }
      }
    ]
  }
};
