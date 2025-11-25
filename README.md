# SkyEarthBack

A complete Express.js backend for the SkyEarth project using Sequelize ORM and MySQL (XAMPP).

---

## Features

* User authentication with **register** and **login** endpoints
* Password hashing using **bcrypt**
* JWT-based authentication with protected routes
* MySQL database connection using Sequelize
* Clean folder structure
* CORS enabled for React frontend (`http://localhost:3000`)
* Automatic table creation with Sequelize `sync()`

---

## Folder Structure

```
SkyEarthBack/
│
├─ config/
│   └─ db.js               # MySQL database configuration
│
├─ models/
│   └─ User.js             # Sequelize User model
│
├─ controllers/
│   └─ authController.js   # Auth controller for register/login
│
├─ routes/
│   └─ authRoutes.js       # Authentication routes
│
├─ middleware/
│   └─ authMiddleware.js   # JWT authentication middleware
│
└─ server.js               # Entry point of the backend
```

---

## Requirements

* Node.js (v14+ recommended)
* MySQL (XAMPP)
* NPM

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd SkyEarthBack
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root folder with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=skyearth_db
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

4. Make sure your MySQL server is running on XAMPP.

---

## Running the Backend

```bash
npm start
```

Server runs on: `http://localhost:5000`

---

## API Endpoints

### Auth

#### **Register**

```
POST /api/auth/register
```

**Body:**

```json
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
  "message": "User registered successfully",
  "userId": 1
}
```

---

#### **Login**

```
POST /api/auth/login
```

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "<JWT_TOKEN>"
}
```

---

#### **Get Current User (Protected)**

```
GET /api/auth/me
```

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

---

## Dependencies

* [express](https://www.npmjs.com/package/express)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## Notes

* Passwords are hashed using **bcrypt**.
* JWT tokens are signed with `JWT_SECRET` from `.env`.
* Sequelize `sync()` ensures all tables are created automatically.
* CORS is enabled for the React frontend running on `http://localhost:3000`.

---

## License

This project is open source and available under the MIT License.
