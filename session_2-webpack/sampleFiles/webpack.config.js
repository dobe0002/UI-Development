const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');

// Code to get the last gitCommit hash
const gitCommit = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
  .slice(0, 7);

/**************** HTML FILES/INCLUDES TO BE UPDATED ***************** */
// The following is a list of files that should have the html/css paths updated

let htmlFiles = [];

/* ****************************************** */

module.exports = {
  entry: {
    my_page_2: './js/page2.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `js/[name].js`
  },
  devtool: '#source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
      chunkFilename: `css/[id].css`,
      allChunks: true
    })
    /*
    new EventHooksPlugin({
      done: () => {
        console.log('GIT VERSION:', gitCommit);

        // replace css and js in html include new gitCommit
        const pattern = new RegExp(
          `(${outputDir}\/(js|css)\/[a-zA-Z0-9.-_]+\.)([a-zA-Z0-9]{7})(\.(js|css))`,
          'g'
        );
        htmlFiles.forEach(filePath => {
          const file = fs.readFileSync(filePath, 'utf8');
          const newFile = file.replace(pattern, `$1${gitCommit}$4`);
          fs.writeFileSync(filePath, newFile);
        });
      }
    })
    */
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
