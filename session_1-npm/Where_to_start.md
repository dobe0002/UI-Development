# NPM

NPM is the package manager and extremely simple build tools used for both nodeJS and JavaScript based applications. NPM pulls packages from a registry - commonly [https://www.npmjs.com/](https://www.npmjs.com/). [What is NPM?](https://docs.npmjs.com/about-npm/)

[Presentation](https://slides.com/kimberlydoberstein/deck-da75c0).

---

## Checking for npm

You can check that NPM is installed by running the following command in terminal:

```
npm --version
```

NOTE: NPM version 6.0.0 or larger is required to receive security warnings.

If npm isn't installed, then install nodeJS. This can be done via homebrew, yum, or the [nodeJS website](https://nodejs.org/en/). If you feel the need to support multiple versions of node, then

---

## Creating a package.json file

Dependencies to be installed are listed in a package.json file at the root of your project. In addition, the package.json can also contain meta information about the project including version.

A sample package.json template would be:

```
{
  "name": "GITHUB_REPO_NAME",
  "version": "0.0.1",
  "description": "APP DESCRIPTION",
  "repository": "GITHUB_URL",
  "author": "University of Minnesota - OIT",
  "license": "MIT",

  "dependencies":{},
  "devDependencies": {},

  "scripts":{}
}

```

### Adding dependencies

Unless another repository is specified, NPM looks at the [public NPM registry](https://www.npmjs.com/) where more information about packages can be found.

List dependencies in the `dependencies` object with the version.

```
...
"dependencies":{
  "axios":"^0.19.0",
  "lodash":"^4.17.15"
},
...
```

Packages tht are only used during development should be listed in the `devDependencies` object. This includes packages related to: linting, formatting, testing, and transpiling.

[Version range documentation](https://docs.npmjs.com/files/package.json#dependencies).

### Scripts

The scripts object can be used to create custom script to be run on the command line. NPM will automatically append node_modules/.bin directory and use it if a script is found. This is a directory where many modules will put shortcuts.

For example instead of writing `"eslint": "node_modules/.bin/eslint ./"` the following can be placed in the script tag:

```
...
"scripts":{
  "eslint": "eslint ./"
}
...
```

A custom script will be run when the following is run on the command line: `npm run <name of script>`. So to run the "eslint" script, the following should be run on the command line: `npm run eslint`

In addition, common command line items can be run. The following is a handy script that will remove installed modules:

```
 ...
 "scripts":{
   "clean": "rm package-lock.json && rm -rf node_modules"
 }
 ...
```

Then the "clean" script can be run by typing `npm run clean`

---

## Installing Packages

To install the dependencies listed in the package.json file, just run:

```
npm install
```

This will download all the dependencies into a `node_modules` directory. This directory should be added to the `gitignore`. `npm install` should be run as part of the build process.

A `package-lock.json` file will be created listing all the dependencies with the exact version installed. The `package-log.json` file should be checked into Github. Future `npm install` commands will install the exact versions listed in teh package-lock.json file.

**NOTE:** If you want to just install the dependencies, then run `npm install --production`

If you want to remove installed devDependencies, then run `npm prune --production`

---

## Security Audit

Every time `npm install` is run, a security audit is run against installed modules for known security advisories. The results are displayed in the command line.

You can run a security audit at any time by running `npm audit`.

The following script will run an audit, will return an exit code of 1 if a moderate, hight or severe issue is found. The results will be saved in a file if any issues are found.

```
 "npmAuditJson": "npm audit || npm audit --json --audit-level moderate > npmAuditReport.json"
```

### GitHub.com

If a repository is saved on github.com, GitHub will automatically scan for security advisories. If any issues are found, then an alert is shown on the repo, repo owners will receive an email, and a pull request will automatically be created that will fix the issues.

---

## Using Packages in HTML

While not ideal, you can reference many traditional Javascript libraries from the node_modules folder. For example, here is the HTML to include the jQuery library:

<script src="node_modules/jQuery/dist/jquery.min.js"></script>

Note: If using this approach, the node_modules will need to be part of the final web application.

A better approach is to use WebPack (see session_2)

---

## Steps To Do Now

- Verify NPM (version 6.0.0 or larger) is available : ( run `npm --version`)

  - Development machines
  - Build servers/containers (aka Jenkins, GitHub Actions, etc)

- Add package.json to projects

  - add meta data
  - [Add lint/formatters](https://github.umn.edu/dobe0002/AppTemplate) to assist development

- Load dependencies via npm

  - List dependencies in package.json
  - Add `node_modules` to `.gitignore`
  - Reference node_modules path to js/css libraries in the html
  - Add `npm install` to build scripts
  - Add `npm prune --production` to the end of the build scripts to remove devDependencies

- Add `npm audit` to build scrips

- Coordinate with ATT developers:
  - GitHub Org for App Dev packages
  - Place to store/server packages
  - Pipeline
