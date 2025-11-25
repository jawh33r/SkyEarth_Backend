# SkyEarth Backend API

A complete Express.js backend with Sequelize ORM, MySQL database, and JWT authentication.

## Features

- ✅ User registration and authentication
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ MySQL database integration
- ✅ Sequelize ORM
- ✅ CORS enabled for React frontend
- ✅ Protected routes with middleware

## Prerequisites

- Node.js (v14 or higher)
- MySQL (via XAMPP)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Start XAMPP and ensure MySQL is running on `localhost:3306`
2. Create the database (or it will be created automatically):

```sql
CREATE DATABASE IF NOT EXISTS skyearth_db;
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=skyearth_db
DB_USER=root
DB_PASSWORD=

# JWT Secret Key (change this in production)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Server Configuration
PORT=5000

# CORS Origin
CORS_ORIGIN=http://localhost:3000
```

**Note:** The `.env` file is already configured to work with default XAMPP MySQL settings. You can modify it if needed.

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Project Structure

```
SkyEarthBack/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── models/
│   └── User.js               # User model
├── routes/
│   └── authRoutes.js         # Authentication routes
├── .env                      # Environment variables (create this)
├── .gitignore                # Git ignore file
├── package.json              # Dependencies and scripts
├── README.md                 # This file
└── server.js                 # Main server file
```

## Database Schema

### Users Table

| Field      | Type          | Constraints           |
|------------|---------------|-----------------------|
| id         | INTEGER       | Primary Key, Auto Increment |
| email      | VARCHAR(255)  | Unique, Not Null      |
| first_name | VARCHAR(100)  | Nullable              |
| last_name  | VARCHAR(100)  | Nullable              |
| password   | VARCHAR(255)  | Not Null (Hashed)     |
| createdAt  | DATETIME      | Auto-generated        |
| updatedAt  | DATETIME      | Auto-generated        |

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 24 hours
- Protected routes require valid JWT token
- CORS configured for React frontend
- Input validation on all endpoints

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Development

For development with auto-reload, you can use:

```bash
npm run dev
```

(Requires nodemon to be installed globally or as dev dependency)

## Troubleshooting

### Database Connection Issues

1. Ensure MySQL is running in XAMPP
2. Check that the database `skyearth_db` exists or can be created
3. Verify credentials in `.env` file match your MySQL setup
4. Check that port 3306 is not blocked

### Port Already in Use

If port 5000 is already in use, change the `PORT` in `.env` file.

## License

ISC

