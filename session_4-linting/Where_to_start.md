## What are formatters and linters

Formatters like Prettier will identify and fix formatting issues with the code. It will only identify items that it can confidently fix like enforcing a 2 space indent. Prettier which is a popular **optioned** formatter. As such there are few configuration options. Prettier will format html, css, scss, json, js and jsx files.

Linters like esLint will identify issues formatting issues along with other code style issues that cannot be automatically fixed like enforcing camel case for all variable names. esLint is highly configurable, and we will use the Airbnb configuration which is becoming one of the more popular configuration sets.

When configured correctly, formatters and linters can work "hand in hand" to ensure code consistently and avoid whitespace changes.

---

## Prettier

Optioned formatter that can automatically reformat code. Works with may UI file types including: js, jsx, html, css, scss, and json.

`"prettier": "1.19.1"`

**Note**: Prettier recommends that you tie to a specific version.

### Config

The Prettier configurations are located in a `.prettierrc.json` file. Generally this file should not be changed to ensure consistency across projects. The available Prettier configuration options is available on the [Prettier website](https://prettier.io/docs/en/configuration.html)

.prettierrc.json:

```
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 80
}

```

### Watch Mode

It can be extremely handy to have Prettier format your files on save. Prettier doesn't have a "watch" mode, you can have prettier run against any newly saved file by also using the `onchange` package.

devDependencies:

```
{
 "prettier": "1.19.1"
 "onchange": "^6.1.0",
}
```

Then add the following in the `script` section of you `package.json`

```
  "prettier:watch": "onchange '**/*.+(js|jsx|html|css|scss|json)' -- prettier --write {{changed}}",
```

---

## ESLint

ESlint is a linter that will identify linting issues. The linting can go beyond formatting issues (like those caught by Prettier) like code styles, variable names etc. ESlint is extremely flexible (it is not optioned) and often you import sets of configurations and plugins in order to get the rule set and behavior you want.

```
  "babel-eslint": "^10.0.3",
  "eslint": "^6.8.0",
  "eslint-config-airbnb": "^18.0.1",
  "eslint-config-prettier": "^6.9.0",
  "eslint-plugin-import": "^2.20.0",
  "eslint-plugin-jsx-a11y": "^6.2.3",
  "eslint-plugin-node": "^11.0.0",
  "eslint-plugin-prettier": "^3.1.2",
  "eslint-plugin-promise": "^4.2.1",
  "eslint-plugin-react": "^7.18.0",
  "eslint-plugin-react-hooks": "^2.3.0",
  "eslint-watch": "^6.0.1",
```

### Configs

There are two ESLint configuration files that should be in most projects project: `.eslintignore` and `.eslintrc.json`

In the `.eslintignore` list any files and/or directories that should not be formatted or linted.

The `.eslintrc.json` file contains all the rules and configurations for ESLint. The available ESLint rules is available on the [ESLint website](https://eslint.org/docs/rules/).

.eslintrc.json:

```
{
  "extends": ["airbnb", "airbnb/hooks", "prettier"],
  "globals": {
    "styles": true
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "jest": true,
    "es6": true,
    "jquery": true
  },
  "parser": "babel-eslint",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-var": "error",
    "curly": "error",
    "one-var": "error",
    "no-console": "error"
  }
}

```

### Fixing issues

You can have ESlint fix issues for you. ESLint will attempt to fix different issues than Prettier, so it is recommended that you use both.

The following scripts in the `script` section of you `package.json` will allow you run eslint, fix only calling eslint, and use both Prettier and ESlint to fix issues:

```
  "lint:js": "esw --color ",
  "lint:js:fix": "npm run lint:js -- --fix",
  "lint:fixAll": "npm run prettier:fixAll && npm run lint:js:fixAll"
```

### Watch mode

You can have ESLint (via the eslint-watch plugin), lint files as they are saved:

Add the following in the `script` section of you `package.json`

```
  "lint:js:watch": "esw --color  --watch ",
```

---

## StyleLint

Like ESLint, StyleLint is a linter for CSS and SCSS files. The linting can go beyond formatting issues (like those caught by Prettier) like code styles, variable names etc. StyleLInt is extremely flexible (it is not optioned) and often you import a set of configurations in order to get the rule set and behavior you want.

```
   "stylelint": "^13.0.0",
   "stylelint-config-standard": "^19.0.0",
```

### Configs

`.stylelintrc`

```
{
  "ignorePath":"./eslintignore",
  "extends": "stylelint-config-standard"
}
```

---

## Preventing Some Security and Accessibility Issues

---

## Finding issues

## Fixing issues

## Watch mode

    "onchange": "^6.1.0",

---

## IDE Plugins

[Prettier](https://prettier.io/docs/en/editors.html), [ESLint](https://eslint.org/docs/user-guide/integrations), Stylelint have plugins for most editors. These plug-ins will highlight formatting and linting errors using the configuration files stored in the project. For most editors, these plug-ins can be configured to automatically fix files on save.

---

## Git Hooks with Husky and lint-staged

You can ensure that your code is properly formatted and linted using git pre-commit or pre-push hooks. Husky is a package that will set-up these hooks.

```
  "husky": "^4.2.1"
```

**NOTE:** Husky requires Node >= 10 and Git >= 2.13.0.

You can define what you want husky to check before a commit or push in a `.huskyrc.js` file:

To remove the hooks, you can either comment out the `hooks` key/value from the `.huskyrc.js` or properly uninstall husky by using this command:

```
npm uninstall husky
```

## What can we do now
