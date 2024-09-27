# E-Commerce Backend API

## Description

This project is a backend API for an e-commerce application. It provides various endpoints to manage products, categories, tags, and product-tag relationships. The API is built using Node.js, Express, Sequelize, and PostgreSQL (or MySQL, depending on your setup).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Technologies](#technologies)
- [License](#license)

## Installation

### Prerequisites:

- Node.js (v14 or above)
- PostgreSQL (or MySQL, depending on your config)
- Insomnia (or Postman) for testing the API

1. **Clone the Repository:**
   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate into the Project Directory:**
   ```bash
   cd your-project-directory
   ```

3. **Install Dependencies:**
   Install the project dependencies by running:
   ```bash
   npm install
   ```

4. **Set Up the Database:**
   You need to have PostgreSQL (or your chosen DB) installed and running. Update the `.env` file with your database credentials (refer to the `.env.example` if provided):

   Create a `.env` file in the root of your project and add the following:
   ```bash
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

   You can also edit `config/config.json` to manually enter database credentials if necessary.

5. **Create the Database:**
   If you haven't created the database yet, you can do so with the following command in PostgreSQL (or your chosen DBMS):
   ```bash
   CREATE DATABASE ecommerce_db;
   ```

6. **Sync the Models with the Database:**
   Run the following command to sync your Sequelize models with the database:
   ```bash
   node server.js
   ```

## Usage

1. **Run the Application:**
   After the setup, start the server by running:
   ```bash
   npm start
   ```

   If you want to use `nodemon` for live reload, run:
   ```bash
   npx nodemon server.js
   ```

2. **Test the API Endpoints:**
   You can test the API using Insomnia or Postman. The server should be running on `http://localhost:3001`.

   Example endpoints:
   - GET `/api/categories` - Get all categories
   - GET `/api/categories/:id` - Get a single category by ID
   - POST `/api/categories` - Create a new category
   - PUT `/api/categories/:id` - Update a category by ID
   - DELETE `/api/categories/:id` - Delete a category by ID
   - Similar routes for Products and Tags...

## Routes

Here are some sample routes for each resource:

- **Categories**:
  - `GET /api/categories` - Get all categories
  - `GET /api/categories/:id` - Get a category by its `id`
  - `POST /api/categories` - Create a new category
  - `PUT /api/categories/:id` - Update a category by its `id`
  - `DELETE /api/categories/:id` - Delete a category by its `id`

- **Products**:
  - `GET /api/products` - Get all products
  - `GET /api/products/:id` - Get a product by its `id`
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product by its `id`
  - `DELETE /api/products/:id` - Delete a product by its `id`

- **Tags**:
  - `GET /api/tags` - Get all tags
  - `GET /api/tags/:id` - Get a tag by its `id`
  - `POST /api/tags` - Create a new tag
  - `PUT /api/tags/:id` - Update a tag by its `id`
  - `DELETE /api/tags/:id` - Delete a tag by its `id`

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Sequelize** - ORM for database interaction
- **PostgreSQL** - Relational database
- **dotenv** - Environment variable management
- **Insomnia** or **Postman** - API testing tool

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
