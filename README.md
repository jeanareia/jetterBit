OrderSystem API
A RESTful API for order management built with Node.js, Express, and Prisma ORM.

📋 Description
OrderSystem is an API that allows you to create, retrieve, update, and delete orders and their items. It uses MySQL as the database, Prisma as the ORM, and JWT-style API Key authentication to protect all routes.

🚀 Getting Started
Prerequisites

Node.js v18+
MySQL running locally or remotely
npm

Installation
bash# Clone the repository
git clone https://github.com/jeanareia/jetterBit.git

# Navigate to the project folder
cd OrderSystem

# Install dependencies
npm install
Database Setup
bash# Run migrations to create the tables
npx prisma migrate deploy

# Generate the Prisma client
npx prisma generate
Running the project
bashnpm start
The server will start on http://localhost:3000.

🔑 Authentication
All routes (except /docs) are protected by an API Key.
Add the following header to every request:
x-api-key: .env.API_KEY

🌍 Environment Variables
You'll find the .env already stored at this project folders.
As this is a study purpose project based, all the information you'll may need are already available at .env.

📖 API Documentation
Interactive API documentation is available via Swagger UI:
http://localhost:3000/docs

🛠️ Tech Stack

Runtime: Node.js
Framework: Express.js
ORM: Prisma 7
Database: MySQL
Validation: Zod
Documentation: Swagger (swagger-ui-express + swagger-jsdoc)