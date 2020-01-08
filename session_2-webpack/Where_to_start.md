# Javascript includes, Babel and Webpack

Newer versions of Javascript allow including one file into another. Because there is a linking between a Javascript and the included files, automated testing can be more easily performed. In addition, a production-ready, browser-friendly, and compressed files can be created.

## Includes

### NPM Modules

If you are including a module, then only the name of the module is needed. For example, let's say you need jQuery included in a custom, JS file. At the top of this file, include this line:

```
import axios from 'jQuery';
```

### Include only a method

// Lodash example

### Including a Local File

### Preparing a Local File for Include

#### Scoping

## Babel

// No need to go into detail => only that is used

## Webpack

### Index file (starting file)

### Tree shaking

// diagram might make sense here

### Sample Config

### Options

// Need to look at how do we include files without a react "starting point" => see https://webpack.js.org/guides/code-splitting/#entry-points

#### Name bundles based on GitHub commit

### Running

#### NPM Scripts

### Using WebPack for other transpiles

// scss => css
// pug => html
// Mention and/or brief example of scss

## Steps To Do Now
