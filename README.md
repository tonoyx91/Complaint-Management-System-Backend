# Complaint Management System - Backend

## Overview
This is the backend API for the **Complaint Management System**, built using **Node.js and Express.js** with **MongoDB** as the database. It handles user authentication, complaint management, and admin functionalities.

## Features
- **User Authentication**: Register and login system with hashed passwords.
- **Role-Based Access**: Admin and customer roles with protected endpoints.
- **Complaint Management**:
  - Users can submit, update, and delete their complaints.
  - Admins can view all complaints and reply.
- **Profile Management**: Fetch user details.

## Tech Stack
- **Node.js** - Backend framework
- **Express.js** - Web framework
- **MongoDB & Mongoose** - NoSQL Database
- **bcrypt.js** - Password hashing
- **dotenv** - Environment variable management

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/complaint-management-backend.git
   cd complaint-management-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and set:
   ```
   MONGO_URI=mongodb://localhost:27017/complaints
   PORT=5000
   ADMIN_EMAIL=admin@admin.com
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Project Structure
```
complaint-management-backend/
│── models/
│   ├── User.js                # User schema and model
│   ├── Complaint.js           # Complaint schema and model
│── controllers/
│   ├── UserController.js      # Handles user authentication & profile
│   ├── ComplaintController.js # Handles complaint management
│── routes/
│   ├── userRoutes.js          # User authentication routes
│   ├── complaintRoutes.js     # Complaint management routes
│── server.js                  # Main server entry point
│── package.json               # Dependencies
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/users/register` | Register a new user |
| `POST` | `/users/login` | Login user and return role |
| `GET` | `/users/profile/:email` | Get user profile details |
| `POST` | `/complaints` | Submit a new complaint |
| `POST` | `/complaints/user` | Get complaints for a specific user |
| `GET` | `/complaints/admin/all?email=admin@admin.com` | Get all complaints (Admin Only) |
| `PATCH` | `/complaints/reply/:id` | Admin replies to a complaint |
| `PUT` | `/complaints/:id` | User updates their complaint |
| `DELETE` | `/complaints/:id` | User deletes their complaint |

## Deployment
1. Set up MongoDB (local or cloud).
2. Deploy using **Heroku**, **VPS**, or **Docker**.
3. Use `pm2` for process management:
   ```sh
   pm2 start server.js --name complaint-backend
   ```
