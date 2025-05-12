# How to run
Run the following to run the web application. The application should run on localhost:5174 (default port for vite dev server).
```
npm run start
```

Run the following to run tests.
```
npm run test
```

# Project overview
* Tanstack router as the routing library for lazy loading route components. It also provides type safe router and allows injecting dependencies to be used in loaders to make it easier to prefetch data unlike other routing libaries.
* Tanstack query is used to help render loading/error state in the UI while waiting for data related actions, deduping requests, fetch, re-fetch stale data, update and cache data retrieved from external sources
* Zod library used for creating schema and validating any data using the schema (currently only used for validating env variable in config service but will be used for all data that requires validation later e.g. validating response from DB or API and validating inputs from user)
* Project structure
  * features/
    * Container pattern (ViewContainer) is used to glue feature hooks and the UI together
    * Feature specific logic are put in feature hooks, so they are separated from the components. They are dependent on commons/data-hooks which uses repository classes
    * Contains components, entities, types and schemas (for validating form inputs) specific for the feature
  * commons/
    * Stores shared components, data-hooks, errors, entities, types, constants etc.
  * infra/
    * Contains implementations that are dependent on external libraries e.g. AxiosHttpClient, ZodValidator
  * repositories/
    * Stores classes responsible for interacting with external data sources
  * services/
    * Contains common services that are used throughout the codebase e.g. config service and validator service (if implementation classes are dependent on third party, library the implementation class will be located in infra/)

# Things I would do with more time:
* Complete useMakePayments hook
  * Add data-hook for mutating due charges data, mutate fn to be called after user clicks pay in the modal
  * Add unit test for useMakePayments
* Add unit test for SimpleModal component
* Work on the other ACs
  * Create Node.js API which provides endpoints for retriving accounts data, retrieving due charges data and adding new due charges (make payment)
  * Add filter feature using select menu to filter data returned by useAccounts hook
  * Add search by address and due charges history page
* Update SimpleErrorAndReload component so it can handle array of Errors and display all error messages 
* Replace mock repositories with repositories that uses Http client to send http request to server, create and return the appropriate error (ApiServerError) on server error
* Use validator service (ZodValidator) to validate API responses, create and return the approriate error (ApiDataValidationError) when it failed
* Add rendered html snapshot test for components using rtl's asFragment and vitest's toMatchSnapshot
* Add image snapshots test for components using playwright/cypress
* Introduce DI container to manage and inject dependencies (this is the reason why abstract classes is used instead of interface as it exists during runtime and can be used as the DI token)
  * Use context to read and subscribe to context with DI container in child components/hooks
  * Create root DI container with common dependencies registered to it and wrap application with root level DI container provider
  * Create DI container for each features and wrap the feature's ViewContainer with feature level DI container provider and register only dependencies required by the feature. Set this feature level DI container's parent to the root level/parent DI container to establish DI container hierarchy so it can get dependencies from parent if none found in feature level DI container