# SECURE BLINK Backend

Building a Secure User Authentication and Authorization System with Express.js

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)


## Project Overview
The objective is to create a secure user authentication and
authorization system using Express.js.

## Prerequisites
Before setting up the backend, make sure you are aware of prerequisites :
- [Node.js](https://nodejs.org/)
- [MongoDB](https://mongodb.com/)
- [Express](https://expressjs.com/)

## Project Structure
The project structure is organized as follows:
```
secureblink/
├── index.js # Main application file
├── Autho.js # File contains authentication routes.
├── logger.js # File contains logging configuration
├── authRoutes.test.js # File contains testcases of authentication routes
├── authenticate.js # File contains middleware of authentication routes
├── User.js # Database schema
├── package.json # Node.js dependencies and scripts
└── README.md # Project documentation 
```

## CAPABILITIES
1. User Registration and Authentication:
- Implement user registration with email and password.
- Store user information securely, including password hashing (using libraries
like bcrypt).
- Implement user login with token-based authentication (JWT).
- Return a JWT token upon successful login.
2. Secure Routes:
- Create a set of routes that are protected and require a valid JWT token for
access.
- Implement middleware for JWT validation to secure these routes.
3. User Roles and Authorization:
- Implement a basic role-based access control system with roles like "user"
and "admin."
- Restrict access to certain routes based on the user's role.
4. Password Reset:
- Implement a "Forgot Password" feature that allows users to reset their
passwords through a secure email-based process.
5. Security Measures:
- Use appropriate libraries to secure against other common attacks.
6. Logging:
- Implement a basic logging system to record user activities and
security-related events.
7. Testing:
- Write test cases to ensure that the authentication, authorization, and 
security features are working as expected.


## Getting Started
Follow these steps to set up and run the App:

### Installation
1. Clone the repository:
- git clone https://github.com/swarupe7/secureblink.git
- cd secureblink 

2. Install dependencies:
- npm install


## Database Schema
The database schema used in the application:

1. **Users Schema:**
- `email` : Email of the user.
- `password`: Password of user.
- `role`: Related to the role of  the user is assigned to.
- `resetPasswordToken`: Helps to identify User during reset of password.
- `resetPasswordExpires`: Sets an expiration Date for reset Token.

## API Endpoints
The following API endpoints are available:

### Task Endpoints(PROTECTED):
- `GET /auth/protected-resource`: Resources only available to users.
- `GET /auth/admin`: Route to admin Dashborad (only admins can access).


### User Endpoints(UNPROTECTED):
- `POST /auth/signup`: Create a new user.
- `POST /auth/login`: login users.
- `POST /auth/forgot-password`: Route to handle forgot password.
- `POST /auth/reset-password`: Route to handle reset password.



## Pictures


