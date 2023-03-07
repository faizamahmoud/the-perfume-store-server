*npm install jest jest-stare jest-serial-runner --save-dev*

// --watchAll --config=jestconfig.json"

## Building A Scalable API Testing Framework With Jest And SuperTest

Focus on API testing

Before starting off, below listed are the reasons why API testing should be encouraged:

# Identifies bugs before it goes to UI
# Effective testing at a lower level over high-level broad-stack testing
# Reduces future efforts to fix defects
# Time-saving

 > Postman
1. Customizable
2. Saves you from the trap of limitations of a ready-made tool
3. Freedom to add configurations and libraries as required and not really depend on the specific supported plugins of the tool
4. No limit on the usage and no question of cost
5. Let’s take Postman for example. If we are going with Newman (CLI of Postman), there are several efforts that are likely to evolve with growing or changing requirements. Adding a new test requires editing in Postman, saving it in the collection, exporting it again and running the entire collection.json through Newman. Isn’t it tedious to repeat the same process every time?

# Jest is pretty impressive.

High performance
Easy and minimal setup
Provides in-built assertion library and mocking support
Several in-built testing features without any additional configuration
Snapshot testing
Brilliant test coverage
Allows interactive watch mode ( jest --watch or jest --watchAll )



# npm run test command will invoke the test parameter with the following:

> NODE_TLS_REJECT_UNAUTHORIZED=0: ignores the SSL certificate
> jest: runs the framework with the configurations defined under Jest block
>reporters: default jest-stare 
>coverage: invokes test coverage
>detectOpenHandles: for debugging
>runInBand: serial execution of Jest tests
>forceExit: to shut down cleanly
>testTimeout = 60000 (custom timeout, default is 5000 milliseconds)



<!-- coverage threshold doesnt have to 100% for non essential files -->
<!-- for non- set the path as the key and copy the object above and reduce coverage? -->

"jest": {
    "verbose": true,
    "testSequencer": "/home/abc/jest-supertest/testSequencer.js",
    "coverageDirectory": "/home/abc/jest-supertest/coverage/my_reports/",
    "coverageReporters": ["html","text"],
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    }
  }

    verbose: to display individual test results
    coverageDirectory: creates a custom directory for coverage reports
    coverageReporters: format of reports generated
    coverageThreshold: minimum and maximum threshold enforcements for coverage results





## SuperTest is a node library, superagent driven, to extensively test Restful web services. It hits the HTTP server to send requests (GET, POST, PATCH, PUT, DELETE ) and fetch responses.

*npm install supertest --save-dev*

>Jest tests with some defined conventions:

describe block - assembles multiple tests or its
test block - (an alias usually used is ‘it’) holds single test 
expect() -  performs assertions 
It recognizes the test files in __test__/ folder

    with .test.js extension
    with .spec.js extension