# Javascript includes, Babel and Webpack

Newer versions of Javascript allow including one file into another. Because there is a linking between a Javascript and the included files, automated testing can be more easily performed. In addition, a production-ready, browser-friendly, and compressed files can be created.

## Includes

### NPM Modules

If you are including a module, then only the name of the module is needed. For example, let's say you need jQuery included in a custom, JS file. At the top of this file, include this line:

```
import axios from 'axios';
```

NOTE: When doing this, the entire contents of the include maybe included in the final bundle.

### Include only a method

Many modules are broken down so you can include just the methods you want.

```
import { each, reduce } from 'lodash'
```

or even

```
import reduce from lodash/reduce
```

Information on how the preferred method of including a package can usually be found on the package's website.

### Including a Local File

When including a local file into another, you need to put in the relative path.

Examples:

```
import myPackage from './myPackage'; // in same directory
import myPackage from './inSubFolder/myPackage';
import myPackage from '../../myPackage';
```

NOTE: If the file want to include has a `.js` or `.jsx` extension, you don't need to include the extension.

### Preparing a Local File for Include

By default, all variables, methods, functions, classes, in an included file are **private**. This is different than you reference a file in the HTML.

You must declare each method, class, variable, etc. available for export by adding the "export" statement. Any object, class, array, etc that is marked as "export" will automatically make internal entries, methods, variables also public.

Examples

```
export const myVar = 'Hello world';

export const myObject = { 'text': 'Hello world'};

export const myFunction = (text) => { return text; }

```

If you have only one item for export, you must include a "default" statement in addition to the "export" statement.

```
export default class MyClass {
  myMethod() {}
}

```

---

## Babel

The issue is that includes are not supported by most browsers. Babel is a JavaScript compiler that transforms more modern JavaScript (like includes) into JavaScript that can be consumed by most browsers.

Configurations for Babel are set in a .babelrc file in the root of your project (or in the same directory as your webpack config). The .babelrc file that is included in this project will work for most web projects.

We won't be calling Babel directly, but will instruct Webpack to use Babel when transforming our JavaScript files.

---

## Webpack

Webpack is a module bundler and task runner. It is commonly used to transform and compress JavaScript files but can be used on may different files.

Webpack looks at the import statements to know what to include in a particular bundle.

Webpack is extremely versatile and can be used to perform all sorts of actions.

### Index file (starting file)

Webpack with an index file(s) which is where Webpack starts. Webpack ensures that all code needed to run that file is included into a bundled file.

Webpack tries to include only code that is used and removes code that isn't used. For example a method in an included file that is never called may be excluded from the final bundle. This is called "tree shaking".

### Sample Config

Webpack requires a config file named `webpack.config.js`. Because Webpack runs in node, you can include node code including node packages like the file system package (fs).

Below is a bare-bones config file that will compress all the dependancies for a `src/index.js` file and save it as a `build/js/bundle.js` file.

```
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
```

#### entry

The files listed for this key will be bundled with their dependencies and compressed.

Example:

```
entry: {
 'file1': ['src/js/code_for_file1.js'],
 'file2_and_3': ['src/js/code_for_file2.js', 'src/js/code_for_file3.js']
}
```

Will produce two files in the build/js directory:

- file.js (contains code_for_file1.js and dependencies)
- file2_and_3.js (contains code_for_file2.js and src/js/code_for_file3.js )

### SCSS and CSS

While WebPack is geared toward bundling Javascript, through the use of plugins, you can compile other file types like SCSS and CSS.

#### Add plugin

First include the mini-css-extract-plugin module by adding this to the top of the webpack.config.js file:

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

Add the following anywhere in the module.exports object:

```
plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
      chunkFilename: `css/[id].css`,
      allChunks: true
    })
```

#### Add a new rule

In the module.rules array, add a new rule to test for scss/css files:

```
{
  test: /\.(s[ac]ss|css)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { sourceMap: true }
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: true }
    }
  ]
}
```

#### Add start files

Finally add SCSS/CSS files into the entry object.

```
entry: {
  mainCSS: 'scss/main_styles_index.css',
  ... (more js and scss/css files)

}
```

After run, a "mainCss.css" files will be created in the build/css directory.

### Name bundles based on GitHub commit

Because Webpack runs on NodeJS, you include or call NodeJS code in your webpack.config.js file.

Knowing this we can get the last Git commit hash (if git is installed on the machine) with this code at the top of the webpack.config.js file:

```
const gitCommit = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
  .slice(0, 7);

```

Now that the git hash is known, you can append it to the bundle file name.

```
...
 output: {
    path: path.resolve(__dirname, outputDir),
    filename: `js/[name].${gitCommit}.js`
  },

...

 new MiniCssExtractPlugin({
      filename: `css/[name].${gitCommit}.css`,
      chunkFilename: `css/[id].${gitCommit}.css`,
      allChunks: true
    })

  ...

```

By adding the commit to the end of the file name, it prevents the browser from cashing older versions of a file.

#### Event hooks

Webpack has numerous hooks where custom code can be run at different points in the bundling process including after the bundling is done.

We can use this hook to change the references in the html files with the new git commit.

Start by adding a reference to the event hooks plugin

```
const EventHooksPlugin = require('event-hooks-webpack-plugin');
```

Add the following at the top of the file. This array lists the paths to all files that contain references to the
// htmlFiles = ['./page1.html', './page2.html'];

Add the following code in the webpack.config.js file:

```

plugins: [
    ...
    new EventHooksPlugin({
      done: () => {
        console.log('GIT VERSION:', gitCommit);

        // replace css and js in html include new gitCommit
        const pattern = new RegExp(
          `(build\/(js|css)\/[a-zA-Z0-9.-_]+\.)([a-zA-Z0-9]{7})(\.(js|css))`,
          'g'
        );
        htmlFiles.forEach(filePath => {
          const file = fs.readFileSync(filePath, 'utf8');
          const newFile = file.replace(pattern, `$1${gitCommit}$4`);
          fs.writeFileSync(filePath, newFile);
        });
      }
    })
  ],
```

---

### Running

The easiest way to get webpack to run is to create a simple script in the package.json file:

```
  "scripts": {
    "build": " rm -rf build && webpack --mode production "
    ...
  }
```

Note, if you webpack.config.js file is not in the same directory as your package.json file, you can add a path to the config file:

```
  "scripts": {
    "build": " rm -rf build && webpack --mode production --config ./path/to/my/webpack.config.js"
    ...
  }
```

## Steps To Do Now

- Verify NPM (version 6.0.0 or larger) is available : ( run `npm --version`)

  - Development machines
  - Build servers/containers (aka Jenkins, GitHub Actions, etc)

- Add Webpack and dependencies (so they are available)

  - webpack.conf.js file
  - .babelrc file
  - package.json

  ```
    "devDependencies": {
        "@babel/core": "7.4.5",
        "@babel/plugin-transform-runtime": "^7.4.4",
        "@babel/preset-env": "7.4.5",
        "@babel/preset-react": "^7.0.0",
        "@babel/runtime": "7.5.5",
        "babel-loader": "^8.0.6",
        "css-loader": "^3.2.0",
        "event-hooks-webpack-plugin": "^2.1.5",
        "mini-css-extract-plugin": "^0.9.0",
        "node-sass": "^4.13.0",
        "sass-loader": "^8.0.0",
        "webpack": "^4.41.5",
        "webpack-cli": "^3.3.5"
      },
  ```

  - Reference bundles in html

    - add `npm run build` to build files

  - Add includes to JS files
