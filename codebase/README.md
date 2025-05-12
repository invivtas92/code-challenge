Run the following to run the web application. The application should run on localhost:5174 (default port for vite dev server).
```
npm run start
```

Run the following to run tests.
```
npm run test
```



TODO:
* Add tests for useMakePayments hook, 
* Create Node.js API which provides endpoints for making payment, retriving accounts data, and retrieving due charges
* Introduce DI container to manage and inject dependencies
  * Use context to read and subscribe to context with DI container in child components/hooks
  * Create root DI container with common dependencies registered to it and wrap application with root level DI container provider
  * Create DI container for each features and wrap the feature's ViewContainer with feature level DI container provider and register only dependencies required by the feature. Set this feature level DI container's parent to the root level/parent DI container so it can get dependencies from parent if none found in feature level DI container.
* Update SimpleErrorAndReload component so it can handle array of Errors and display all error messages 
* Replace mock repositories with repositories that uses Http client to send http request to server, create and return the appropriate error (ApiServerError) on server error
* Use validator service (ZodValidator) to validate API responses, create and return the approriate error (ApiDataValidationError) when it failed
* Add rendered html snapshot test for components using vitest
* Add image snapshots test for components using playwright/cypress
* Logging