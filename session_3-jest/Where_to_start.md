# JavaScript testing with Jest

Jest is a framework to test JavaScript-based applications. It it very popular in the React world, but it can also be used for non-React JavaScript.

While you can start to write tests for both html and css, neither of these files/code contain a lot of logic. Instead of attempting to write tests for this, we will focus on testing our JavaScript files/code.

## Adding via NPM

Jest can be added by adding the following to the package.json file:

```
"devDependencies": {
    "jest": "^24.9.0",
    "jest-cli": "24.9.0",
    "babel-jest": "^24.9.0",
    "@babel/core": "^7.8.3",
    "@babel/preset-env": "^7.8.3",
    "@babel/preset-react": "^7.8.3",
    "@babel/plugin-transform-runtime": "^7.8.3",
    "@babel/runtime": "^7.5.5",
    "babel-loader": "^8.0.6"
  },
```

Then it extremely common to add an entry to the `scripts` section:

```
 "scripts": {
    "test": "jest  "
  }
```

## Configuration

All Jest configurations should be saved in a `jest.config.js` file. The main configuration is for all code to be passed through Babel:

```
module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
```

## Prepping JavaScript for tests

Ensure that each file has a concise set of related methods and/or a single class. In addition, ensure that each method/function does a single action. This will mean that both your files and functions/methods will become much smaller.

In addition, while simple DOM scripting can be done within Jest, more complex actions (like event listening) can lead to complicated tests. The use of "puppeteer" or other browser engine/emulator isn't recommended because it can lead to writing functional tests instead of unit tests.

To make testing easier, split any DOM scripting into its own function/method. That way code can be tested up through the HTML creation can be tested.

## Test files

All tests should be saved in a `__tests__` directory. Jest will automatically run all tests that are saved in this directory and all sub-directories.

For every file you want tested, there should be a single file in the `__tests__` directory. AKA there is a one-to-one ratio for files to test files. The test file should be name of the corresponding Javascript file along with `.test.js`.

For example:

```
   - __tests___/
        - js/
           - page1.test.js
           - MyClass.test.js

  - js/
        - page1.js
        - MyClass.js
```

## Writing tests

The first thing to include (aka import) is the file you want to test. Then, although not required, like tests are place in a `describe` block:

```
import MyClass from '../../MyClass'

describe('Description of test set', () => {
  // tests will go here
})

```

Then each test starts with a `test` method:

```
import MyClass from '../../MyClass'

describe('Description of test set', () => {
  test('Description of test', () => {
    // test code goes here
  })
})

```

## Expect methods

Each assertion starts with the `expect` method. There are [numerous methods you can call for assertion](https://jestjs.io/docs/en/expect), but some of the popular ones are:

- toEqual
- not
- toBeTruthy
- toBeFalsy
- toHaveLength
- toBeNull
- toBeUndefined
- toContain

Example:

```
import MyClass from '../../MyClass'

describe('Description of test set', () => {
  test('Check value', () => {
    const myClass = new MyClass();
    expect(myClass.myVar).toEqual('foo');
    expect(myClass.myVar).not.toEqual('bar');
  })

  test('Check boolean', () => {
    const myClass = new MyClass();
    expect(myClass.myBoolVar).toBeTruthy();
    expect(myClass.myOtherBoolVar).toBeFalsy();
  })
})
```

## Setup and Teardown

Like most other testing frameworks, there are [setup and teardown methods](https://jestjs.io/docs/en/setup-teardown) you can call before and after test. For Example:

```
describe('Description of test set', () => {
  const myClass={};
  beforeEach(()=>{
    myClass = new MyClass()
  })


  test('Check value', () => {
    expect(myClass.myVar).toEqual('foo');
    expect(myClass.myVar).not.toEqual('bar');
  })

  test('Check boolean', () => {
    expect(myClass.myBoolVar).toBeTruthy();
    expect(myClass.myOtherBoolVar).toBeFalsy();
  })
})

```

## Mocking

To make tests dependable, they shouldn't reach out to outside systems. Jest allows you mock a method/function or even an npm package. For UI code, the main method an application reaches out to an outside system is via an ajax call. Most likely you will be using a package like axios.

To mock ajax calls, you can just mock the axios module. To have Jest mock a package, create a `__mocks__` directory at the root of the project. Then create a file with the name of the package. For example `axios.js`.

For axios, here is a sample `__mocks__/axios.js` file:

```
let data = {};
let error = '';
let calls = [];

module.exports = {
  /* *** Data setters and getters ** */
  setData(data) {
    data = data;
  },
  setError(data) {
    error = data;
  },
  getCalls() {
    return calls;
  },
  reset() {
    data = {};
    error = '';
    calls = [];
  },

  /* **** GET **** */
  get: jest.fn(endpoint => {
    calls.push(endpoint);

    if (error !== '') {
      return Promise.reject(new Error(error));
    }

    switch (true) {
      case /foo/.test(endpoint):
        return Promise.resolve({ data: data });
      default:
        return Promise.resolve({ data: data });
    }
  })
};
```

Note: the mock files are written in NodeJS.

While you can save the data returned in an ajax call in the test itself, it can be helpful to save a copy of a specific response from an outside system in a separate file in a separate directory. This makes it easy to find. There isn't a particular convention used, but we have found `__fixtures__` works as a directory name.

```
   - __tests___/
        - js/
           - page1.test.js
           - MyClass.test.js

  - __mocks__
        - dinoIpsum.js
        - baconIpsum.js
```

### Calling a mocked ajax package.

The following is an example of setting up the data to be returned when axios is used to make an ajax call:

```
import Ipsum from '../../js/Ipsum';
import axios from 'axios';
import dinoIpsum from '../../__fixtures__/dinoIpsum';

describe('Ipsum tests', () => {
  let ipsum = {};

  beforeEach(() => {
    ipsum = new Ipsum();
    axios.reset();
  });

  /*  *** Public methods - Get() *** */
  test('get returns the dino ipsum', async () => {
    axios.setData(dinoIpsum); // sets the ajax response

    let response = await ipsum.getIpsum();

    expect(response).toEqual(dinoIpsum[0]); // verifies the response from the ajax call
    expect(axios.getCalls()[0]).toContain('dinoipsum'); // checks with axios that the correct url wa sused
  });
});

```

## Coverage

Coverage reports along with what files to include in the coverage report can be enabled in the `jest.config.js` file.

```
module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/webpack.config.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/build/**',
    '!**/jest.config.js/**',
    '!**/__fixtures__/**'
  ],
  coverageReporters: ['html', 'cobertura', 'json-summary', 'text-summary']
};

```

Once enabled (collectCoverage: true). a report will be created (or updated) in a `coverage` directory. This directory should be added to the `.gitignore`.

### Coverage util

If, as part of the Jenkins build process, there is a need enforce an minimum coverage, a simple NodeJS helper file can be used instead of relaying on Jenkins plugins.

Ensure that in the jest.config.js file, coverageReporters contains 'json-summary'.

Save the following file in a `utils` directory:

```
const path = require('path');
const fs = require('fs');

try {
  let json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../coverage/coverage-summary.json')));

  console.log('Coverage Summary: ');
  console.log(json.total);

  if (json.total.lines.pct < 75) {
    console.log('******************\n');
    console.log('Minimum coverage of 75% of lines covered was not met.');
    process.exitCode = 1;
    console.log('\n******************');
  } else {
    process.exitCode = 0;
  }
} catch (e) {
  console.log('******************\n');
  console.log('Cannot get test coverage report');
  console.log('\n******************');
  process.exitCode = 1;
}

```

To make running the simple coverage check easier, add the following to `scripts` in the `package.json` file:

```
"coverage": "node utils/testCoverage.js"
```

Run the tests to generate the coverage report: `npm run test`.

Then check the coverage: `npm run coverage`

## What to test (don't test private methods)

The recommendation is that private methods are not tested. In JavaScript, there isn't a concept (yet) of a private class method. So, in theory, all methods are public.

In reality, not all methods are called outside the class. Many Javascript developers error on the side of caution and create tests for all methods realizing this adds to the code base that needs to be maintained.

In practice, these "private" methods should have tests, but are marked as "private" in the tests. If there is an issue with these tests, a future developer can be comfortable removing these tests instead of investing a large amount of time debugging/update the tests.
