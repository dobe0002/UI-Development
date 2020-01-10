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

// Global variables
let entry = {};
let htmlFiles = [];

/**************** OUTPUT (aka build) DIRECTORY ***************** */
const outputDir = 'build';

/**************** FILES TO BE COMPRESSED ***************** */
// COMPRESS A GIVEN LIST OF FILES
entry = {};

/* ****************************************** */

/**************** HTML FILES/INCLUDES TO BE UPDATED ***************** */
// The following is a list of files that should have the html/css paths updated

htmlFiles = [];

/* ****************************************** */

module.exports = {
  context: __dirname,

  entry: entry,

  output: {
    path: path.resolve(__dirname, outputDir),
    filename: `js/[name].js`
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: '#source-map',
  // performance: { hints: false },

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
