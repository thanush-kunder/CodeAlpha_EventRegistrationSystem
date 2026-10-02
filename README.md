# CodeAlpha Event Registration System

A comprehensive event registration backend service built with Node.js, Express.js, MongoDB, and JWT authentication.

## Features

- User registration and authentication with JWT
- Event creation and management
- Event registration for users
- View available events and event details
- Cancel event registrations
- User-specific registration management
- Admin access to all registrations
- Role-based access control (User/Admin)
- Input validation and error handling

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **dotenv** - Environment variable management

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd CodeAlpha_EventRegistrationSystem
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/event-registration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB server (if running locally)

6. Run the application
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### 1. Register User
**POST** `/api/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login User
**POST** `/api/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 3. Get Current User
**GET** `/api/auth/me`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Events

#### 4. Get All Events
**GET** `/api/events`

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "title": "Tech Conference 2024",
      "description": "Annual technology conference",
      "date": "2024-03-15T09:00:00.000Z",
      "location": "New York",
      "capacity": 500,
      "registeredCount": 250,
      "organizer": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k",
        "name": "Admin User",
        "email": "admin@example.com"
      }
    }
  ]
}
```

#### 5. Get Event by ID
**GET** `/api/events/:id`

Response:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-03-15T09:00:00.000Z",
    "location": "New York",
    "capacity": 500,
    "registeredCount": 250,
    "organizer": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "name": "Admin User",
      "email": "admin@example.com"
    }
  }
}
```

#### 6. Create Event
**POST** `/api/events`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-03-15T09:00:00.000Z",
  "location": "New York",
  "capacity": 500
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-03-15T09:00:00.000Z",
    "location": "New York",
    "capacity": 500,
    "registeredCount": 0,
    "organizer": "65a1b2c3d4e5f6g7h8i9j0k"
  }
}
```

#### 7. Update Event
**PUT** `/api/events/:id`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "title": "Updated Event Title",
  "description": "Updated description",
  "date": "2024-03-20T09:00:00.000Z",
  "location": "Los Angeles",
  "capacity": 600
}
```

#### 8. Delete Event
**DELETE** `/api/events/:id`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### Registrations

#### 9. Register for Event
**POST** `/api/registrations`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "eventId": "65a1b2c3d4e5f6g7h8i9j0k"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "user": "65a1b2c3d4e5f6g7h8i9j0k",
    "event": "65a1b2c3d4e5f6g7h8i9j0k",
    "status": "registered",
    "registeredAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 10. Get User Registrations
**GET** `/api/registrations/user`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "user": "65a1b2c3d4e5f6g7h8i9j0k",
      "event": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k",
        "title": "Tech Conference 2024",
        "date": "2024-03-15T09:00:00.000Z"
      },
      "status": "registered",
      "registeredAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 11. Cancel Registration
**DELETE** `/api/registrations/:id`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "message": "Registration cancelled successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "status": "cancelled",
    "cancelledAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### 12. Get All Registrations (Admin Only)
**GET** `/api/registrations`

Headers:
```
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "user": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "event": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k",
        "title": "Tech Conference 2024",
        "date": "2024-03-15T09:00:00.000Z"
      },
      "status": "registered",
      "registeredAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Project Structure

```
EventRegistrationSystem/
├── src/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── eventController.js      # Event management logic
│   │   └── registrationController.js # Registration logic
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Event.js                 # Event schema
│   │   └── Registration.js          # Registration schema
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication routes
│   │   ├── eventRoutes.js           # Event routes
│   │   └── registrationRoutes.js    # Registration routes
│   ├── middleware/
│   │   ├── auth.js                  # Authentication middleware
│   │   └── errorHandler.js          # Error handling
│   └── server.js                    # App entry point
├── .env.example                     # Environment variables template
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Event Model
```javascript
{
  title: String (required),
  description: String (required),
  date: Date (required),
  location: String (required),
  capacity: Number (required, min: 1),
  registeredCount: Number (default: 0),
  organizer: ObjectId (ref: User),
  image: String,
  createdAt: Date
}
```

### Registration Model
```javascript
{
  user: ObjectId (ref: User, required),
  event: ObjectId (ref: Event, required),
  status: String (enum: ['registered', 'cancelled'], default: 'registered'),
  registeredAt: Date (default: Date.now),
  cancelledAt: Date
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Testing with Postman

Import the provided Postman collection to test all endpoints:

1. Open Postman
2. Click Import
3. Select the `EventRegistrationSystem.postman_collection.json` file
4. Update the `baseUrl` variable to match your server
5. Test each endpoint

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- Resource not found errors

All errors return a JSON response with:
```json
{
  "success": false,
  "error": "Error message"
}
```

## License

ISC

## Author

CodeAlpha Intern

## Acknowledgments

This project was developed as part of the CodeAlpha Backend Development Internship program.
