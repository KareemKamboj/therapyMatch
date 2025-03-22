# TherapyMatch Backend API

A robust Express.js backend service for the TherapyMatch platform, facilitating connections between therapy seekers and mental health professionals.

## 🚀 Features

- Authentication and Authorization
- Role-based access control (Seekers and Helpers)
- Matching algorithm based on preferences and criteria
- User profile management
- Secure API endpoints with JWT authentication

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Logging**: Morgan

## 📁 Project Structure

```
src/
├── config/         # Configuration files and environment setup
├── controllers/    # Request handlers and business logic
├── middleware/     # Custom middleware (auth, validation, etc.)
├── models/        # MongoDB/Mongoose models and schemas
├── routes/        # API route definitions
├── services/      # Business logic and third-party service integration
├── validations/   # Request validation schemas
└── server.ts      # Application entry point
```

## 🔧 Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/therapy_match
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚦 Available Scripts

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build TypeScript code
- `npm start`: Run production server
- `npm run watch`: Watch mode for TypeScript compilation

## 📝 API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive JWT token

### Seeker Routes

- `GET /api/seeker/matches`: Get therapy matches based on preferences
  - Query Parameters:
    - `limit` (optional): Number of matches to return (1-50)

### Helper Routes

- `GET /api/helper/profile`: Get helper profile
- `PUT /api/helper/profile`: Update helper profile

## 🔐 Security

- JWT-based authentication
- Password hashing using bcrypt
- Input validation and sanitization
- Role-based access control

## 🔄 Matching Algorithm

The matching service uses a sophisticated algorithm considering multiple factors:
- Language preferences
- Therapy types
- Specialties
- Availability
- Location (if applicable)
- Previous ratings and success rates

## ⚠️ Error Handling

The API uses a consistent error response format:
```json
{
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## 🧪 Testing

(TODO: Add testing documentation when tests are implemented)

## 📈 Future Improvements

- Implement comprehensive test suite
- Add rate limiting
- Implement caching layer
- Add WebSocket support for real-time features
- Enhance matching algorithm with ML components 