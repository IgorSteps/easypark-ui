# easypark-ui

This project is the front-end UI for EasyPark.

## Prerequisites

Before you begin, ensure you have `node.js` installed on your machine.

## Installing

To set up the project for development on your local machine, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/IgorSteps/easypark-ui.git
   cd easypark-ui
   ```

2. **Install dependencies**

   Install all necessary dependencies for the project by running:

   ```bash
   npm install
   ```

## Running locally

Once the installation and environment configuration are complete, you can run the project using the following commands:

- **Start the development server**

  These commands serve your app at `localhost:9000` and uses hot reloading:

  - Using Mirage to mock backend:

  ```bash
  npx webpack serve --config-name=mirage
  ```

  - Using real backend:

  ```bash
  npx webpack serve --config-name=backend
  ```
  
- **Run unit tests**

  Execute the unit test:

  ```bash
  npm test
  ```

- **Run end-to-end tests with Cypress**

  Opens the Cypress test runner for running end-to-end tests:

  ```bash
  npx cypress open
  ```

## Useful things

### MirageJS Mocking

To mock new API route using MirageJS, add it to [here](./mirageServer.js). Follow this [tutorial](https://miragejs.com/tutorial/intro/) on MirageJS website.
