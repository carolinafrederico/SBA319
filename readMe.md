
# 📘 About Me: Blog API Server

Welcome to the **Blog API Server**, a small but powerful Node.js and Express-based application backed by MongoDB. This server is built as a foundation for a blogging platform where users can create accounts, write posts, and leave comments — all with structured and relational data using MongoDB’s document-based model.

## 🔧 Technologies Used

- **Node.js** – JavaScript runtime for server-side logic.
- **Express.js** – Lightweight web framework to build APIs.
- **MongoDB** – NoSQL database for storing users, posts, and comments.
- **Mongoose** – ODM (Object Data Modeling) tool to manage schemas and models.
- **dotenv** – For managing environment variables.
- **Postman** – For testing and verifying all endpoints.

## 🧠 Project Structure & Features

```
/
├── controllers/          # Business logic for each model (User, Post, Comment)
├── models/               # Mongoose schemas for each entity
├── routes/               # Express routes grouped by resource
├── database/             # MongoDB connection setup
├── seedData.js           # Script to seed the database with sample data
├── server.js             # Entry point that configures Express and middleware
├── aboutMe.md            # You are here!
└── .env                  # Port and MongoDB URI configuration
```

## 🧩 Core Functionalities (INDUCES)

All models implement full **CRUD** functionality:

### 🧍 Users (`/user`)
- **I**ndex – `GET /user` → Lists all users with populated post & comment.
- **N**ew – Handled via Postman or front-end; accepts all user data including references.
- **C**reate – `POST /user` → Adds a new user (must include valid `post` and `comment` ObjectIds).
- **U**pdate – `PUT /user/:id` → Edits user details; validates post/comment if changed.
- **D**estroy – `DELETE /user/:id` → Deletes a user by ID.
- **E**dit – Simulated in Postman or frontend.
- **S**how – `GET /user/:id` → Retrieves one user by ID with populated data.

### 📝 Posts (`/post`)
- Supports basic CRUD operations:
  - `GET /post` → List all posts
  - `POST /post` → Create a new post
  - `GET /post/:id` → Retrieve a single post
  - `PUT /post/:id` → Update a post
  - `DELETE /post/:id` → Delete a post

### 💬 Comments (`/comment`)
- Supports basic CRUD operations:
  - `GET /comment` → List all comments
  - `POST /comment` → Create a new comment
  - `GET /comment/:id` → Retrieve a single comment
  - `PUT /comment/:id` → Update a comment
  - `DELETE /comment/:id` → Delete a comment

## 🔗 Relationships

- Each **User** is linked to one **Post** and one **Comment** using `ObjectId` references.
- Populations of `post` and `comment` fields are used in all user fetch operations for richer data.

## 🚀 How the Server Was Built

1. **Initialize Project:**
   ```bash
   npm init -y
   npm install express mongoose dotenv
   ```

2. **Connect to MongoDB** using Mongoose in `database/database.js`.

3. **Define Models** (`User`, `Post`, `Comment`) in `models/` with Mongoose schemas and relationships.

4. **Seed Database** with sample records using `seedData.js`.

5. **Build Controllers** for each model to handle the logic for CRUD operations.

6. **Set Up Routes** in `routes/`, connecting them to controllers via Express.

7. **Start Server** in `server.js`:
   ```bash
   node server.js
   ```

8. **Test with Postman** using `GET`, `POST`, `PUT`, and `DELETE` requests.

## 🧪 Postman Test Tips

To test User creation:
- Create a **Post** and a **Comment** first.
- Use their `_id` values in the request body of a `POST /user`.

Example body:
```json
{
  "Uid": 111,
  "firstName": "Testy",
  "lastName": "McTest",
  "email": "test@example.com",
  "password": "securepass",
  "dob": "1990-01-01",
  "post": "606c6e50d2345b0015b35abc",
  "comment": "606c6e50d2345b0015b35def"
}
```

## 📌 Final Notes

This app was built as a learning project to demonstrate full-stack backend development principles:
- Data modeling
- API routing
- CRUD operations
- Data relationships
- RESTful conventions

