# Express Authentication App with Passport.js

This is a basic web application built with **Node.js** and **Express**, which implements user authentication using **Passport.js**, **bcrypt** for password hashing, and **sessions** to manage user logins. The app allows users to register, log in, and view a personalized dashboard upon authentication.

## Features
- **User Authentication**: Users can register, log in, and log out.
- **Sessions**: User sessions are managed to persist login state.
- **Passport.js**: Authentication strategy for handling login requests.
- **bcrypt**: Secure password hashing and storage.
- **Flash Messages**: For displaying errors, such as incorrect login credentials or failed registration.
- **EJS Templates**: Templating engine for rendering views with dynamic content.
- **CRUD Routes**: For posts and comments.
- **Method Override**: For supporting HTTP verbs like PUT and DELETE in HTML forms.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Setup](#setup)
3. [Folder Structure](#folder-structure)
4. [Environment Variables](#environment-variables)
5. [Routes](#routes)
6. [Middleware](#middleware)
7. [Error Handling](#error-handling)
8. [Contributing](#contributing)
9. [License](#license)

## Technologies Used
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- **bcrypt**: Password hashing library.
- **express-session**: Middleware for session management.
- **method-override**: Middleware for supporting PUT and DELETE HTTP methods in forms.
- **ejs**: Templating engine for dynamic HTML rendering.
- **dotenv**: For loading environment variables from a `.env` file.
- **express-flash**: For displaying flash messages (success/error).
- **ejs-mate**: A layout engine for EJS templates.

## Setup

To get started, clone this repository and install the necessary dependencies:

```bash
git clone <repository-url>
cd <project-folder>
npm install
