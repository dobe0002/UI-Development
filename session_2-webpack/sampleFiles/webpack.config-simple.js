const path = require('path');

module.exports = {
  entry: {
    bundle: ['src/index.js'] // list of starting files
  },
  output: {
    filename: `build/js/[name].js`
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
};
