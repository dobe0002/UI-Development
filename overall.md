# Start of UI Development Plan

## Overall goals for UI development

- Separation for front-end and back-end code
- Reuse of modules and atomic design
- Meet UofM accessibility standards
- Automated unit accessibility test for React code
- Self contained (aka mocked) automated testing for all js (and React) code
- Only use NodeJS-based packages for utils, builds, etc. - aka reduce items needed to develop/run a UI application
- Reduction of "snow flake" application - aka create consistency on how UIs are developed.
- Reduce size of downloads by reducing reliance on very large bundled libraries like jQuery

## List of recommended technologies

- [NPM](https://docs.npmjs.com/) - package management and [registry](https://www.npmjs.com/)
- [esLint](https://eslint.org/)/[Prettier](https://prettier.io/) - linting and formatting
- [Babel](https://babeljs.io/) - Compiles ECMAScript 2015+ code into a backwards compatible version of JavaScript
- [WebPack](https://webpack.js.org/) - Transpile into production-ready bundles
- [React](https://reactjs.org/) - Javascript/UI framework
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start) - Routing
- [Redux](https://redux.js.org/) - State management (not needed for all projects)
- [Jest](https://jestjs.io/) - Testing framework
- [Enzyme](https://airbnb.io/enzyme/) - Testing plugin for components
- [jest-axe](https://github.com/nickcolley/jest-axe) - automated accessibility testing
- [axios](https://github.com/axios/axios) - ajax calls
- [date-fns](https://date-fns.org/) - date logic
- [lodash](https://lodash.com/) - Collection manipulation when [vanilla array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) won't work
- [reactstrap](https://reactstrap.github.io/) - React Bootstrap 4 components

## Suggested IDE and/or plugins

Any IDE will work, so feel free to use whatever you are most comfortable with. With that said, many UI and NodeJS developers use [Visual Studio Code](https://code.visualstudio.com/) because it adds additional features like breakpoints.

### Suggested plugins

- ESLint
- HTML Boilerplate
- Jest
- Npm Dependency
- npm Intellisense
- Prettier
- Reactjs code snippets
