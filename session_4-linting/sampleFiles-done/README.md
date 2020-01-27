# AppTemplate

Configurations to install Prettier and ESLint along with configurations and CLI commands in a web project. This will identify linting issues along with fixing formatting issues. This will allow consistency between developers.

## Just get me started

1.  Download this app
2.  Run `npm i` in a terminal while the app root directory. If this fails, see the "NodeJS" section.
3.  Write some poorly formatted code in the `src` directory.
4.  Run `npm run prettier:writeAll` at the app root directory.  Note: There may be `npm ERR!` errors.  This will happen if issues are found.  Fixable issues will be fixed.
5.  Ensure that the code has been formatted correctly.
6.  Run `npm run eslint` to identify any linting issues that cannot be automatically fixed. Note: There may be `npm ERR!` errors if there are linting errors.

---

## What are formatters and linters

Formatters will identify and fix formatting issues with the code. It will only identify items that it can confidently fix like enforcing a 2 space indent. The recommended formatter is Prettier which is a popular optioned formatter. As such there are few configuration options. Prettier will format html, css, scss, json, js and jsx files.

Linters will identify issues formatting issues along with other code style issues that cannot be automatically fixed like enforcing camel case for all variable names. The recommended linter is the popular and highly configurable ESLint. The recommended ESLint configuration is the Airbnb configuration which is becoming one of the more popular configuration sets.

When configured correctly, formatters and linters can work "hand in hand" to ensure code consistently and avoid whitespace changes. This project contains the configurations and commands to allow Prettier and ESLint to work together.

## nodeJS

Both the formatter (Prettier) and linter (ESLint) will be installed via npm (installed with nodeJS) and run under nodeJS, so nodeJS must be installed on the host machine or container. You can verify nodeJS is installed by running this command `node -v` and npm is installed by running `npm -v`.

The recommended version of nodeJS is 12 and npm must be version v6.1.0 or higher.

NodeJS can be installed via yum, homebrew, and from the [nodeJS website](https://nodejs.org/en/).

If you have a need to install multiple versions of nodeJS, please check out [NVM](https://github.com/nvm-sh/nvm)

## Configure in your project

The following section will walk you through how you add Prettier and ESLint to your project.

### package.json

If your project doesn't have package.json file at the root level of your project, copy the `package.json`file from this project into the root level of your project. Then either update or remove the following configurations:

- name
- version
- description
- repository

If you project already has a `package.json` file, move all the items from the `devDependencies` and `script` sections into your `package.json` file

### ESLint configs

There are two ESLint configuration files that should be moved from this project into the root level of your project: `.eslintignore` and `.eslintrc.json`

In the `.eslintignore` list any files and/or directories that should not be formatted or linted.

The `.eslintrc.json` file contains all the rules and configurations for ESLint. Generally this file should not be changed to ensure consistency across projects. The available ESLint rules is available on the [ESLint website](https://eslint.org/docs/rules/).

### Prettier config

The Prettier configurations are located in the `.prettierrc.json` file. Generally this file should not be changed to ensure consistency across projects. The available Prettier configuration options is available on the [Prettier website](https://prettier.io/docs/en/configuration.html)

## Installing Prettier and ESLint

Prettier and ESLint should be installed inside the project. This ensures that every member of a team is using the same versions of the modules. Different versions of the modules can produce different results.

In a terminal window, at the root directory of the project, type `npm install`. This will install all the needed modules along with their dependencies into a `node_modules` directory. This directory should be added to the `.gitignore` file and NOT checked into GitHub.

Installing modules will also create a `package-lock.json` file. This documents what version of the modules were installed and npm will use this file when running `npm install` to install specific versions of the modules. This ensures constancy between team members. The `package-lock.json` file SHOULD be checked into GitHub.

## NPM Audit

You can have npm check all installed modules for all known security vulnerabilities by running `npm run npmAudit`. The results should be outputted to the terminal. Most issues cna be resolved by updating modules to a high version in the `package.json` file.

### Recording NPM Audit results

If you run the `npm run npmAuditJson` npm will check all installed modules for high and critical security vulnerabilities and save a summary of the results into a `npmAuditReport.json` file. This normally wouldn't be checked into GitHub but should be part of an artifact of the application.

## Running linting checks

You can get a report of all linting errors in the project by running `npm run eslint`. If you want to run a linting check on a single file or directory, just add the path at the end of the command. For example `npm run eslint src/sample.js`.

## Automatically fixing issues

If you want the formatter to automatically fix all formatting issues across the project, you can run the following command `npm run prettier:write`.

If you want a list of files that have formatting issues without changing the files, run this command `npm run prettier:check`.

There are a few linting issues that will not be fixed by the formatter, but can be fixed by running `npm run eslint:fix`.

If you want both the formatter and linter to fix any issues they can run `npm run prettier:writeAll`. This command will run both the `npm run prettier:write` and `npm run eslint:fix`.

### Watch

Both Prettier and ESLint have CLIs that can be used to watch for issues on changed files and automatically fix them.

Unfortunately there isn't a single command that will watch and fix issues both from the formatter and linter. The command to watch for formatting issues is `npm run prettier:watch` and the command to watch for and fix linting issues is `npm run eslint:watch -- --fix`.

NOTE: Not all issues can be fixed automatically, so it is important to run `npm run eslint` before checking code into GitHub to ensure all linting issues have been resolved.

## Editor plug-ins

Both [Prettier](https://prettier.io/docs/en/editors.html) and [ESLint](https://eslint.org/docs/user-guide/integrations) have plugins for most editors. These plug-ins will highlight formatting and linting errors using the configuration files stored in the project. For most editors, these plug-ins can be configured to automatically fix files on save.

## Jenkins

Ideally a check should be part of a Jenkins file to check for both linting and known security vulnerabilities. The following are an example stages:

```
  stage('Build') {
      steps {
        sh 'npm install'
        sh 'sh 'node -v > node_version'
      }
    }
  stage('UI Code Linting') {
    steps {
      catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh 'npm run eslint'
      }
    }
  }

  stage('NPM Audit') {
    steps {
      sh 'npm run npmAuditJson'
    }
  }
```

This means that nodeJS needs to be installed on the Jenkins server or be installed in the Docker container.

---

## Additional rules:

While both Prettier and eslint will identify most issues, the following are additional rules that should be followed when writing code and performing pull request reviews:

### JS

- Use arrow functions instead of function declarations when possible

  - For example `const myFunction = (params) => { return true; }` instead of `function myFunction (params) { return true; }`

- Use template literals over traditional concatenation when possible

  - For example `` `I like ${food}!` `` instead of `"I like" + food + "!"`

- Use classes instead of nested objects to protect namespace/scope.

- Class names begin with a capital letter, while instances of a class, method/function definitions along with all other variables start with a lower-case letter.

- Always use curly braces for if, else if, else, for, while, or do tags.

  - For example `if (true) { return true }` instead of `if (true) return true`

- Use ternary operator for simple if/else statements, but do not nest ternary operators.

  - For example: `let like = food === 'tacos' ? 'yum' : 'nope'`

- Use a switch statement instead of a series of if statements.
  - For example:
  ```
  let like = '';
  switch (food) {
    case 'tacos':
      like = 'yum';
      break;
    case 'fish':
      like = 'yuck!';
      break;
    default:
      like = "don't know";
  }
  ```
  instead of
  ```
  let like = '';
  if (food === 'tacos') {
    like = 'yum';
  } else if (food === 'fish') {
    like = 'yuck';
  } else {
    like = "don't know";
  }
  ```
- All methods/functions except for a class constructor should have a return statement. If a returned value doesn't make sense, then a value of undefined or true should be returned.

---

### HTML

- Use html 5 elements instead of aria attributes when possible
  - For example `<main>` instead of `<div role="main">`

---

### CSS / SCSS

More to come.
