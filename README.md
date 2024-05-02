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

3. **Setup Environment**

   You can configure the project to either run with a mock server for development or connect to a real backend API. To set up the desired environment:

   - **For development with Mirage Dev server:**
     - No additional configuration is needed. The project is set up to use Mirage by default when running in development mode.

   - **For connecting to a real backend:**
     - In the `.env` file in the root directory of the project.
     - Change the following line to specify the base URL of our backend API:

       ```plaintext
       BASE_API_URL=http://localhost:8080
       ```

### Running the Project

Once the installation and environment configuration are complete, you can run the project using the following commands:

- **Start the development server**

  This command serves your app at `localhost:9000` and uses hot reloading:

  ```bash
  npx webpack serve
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
