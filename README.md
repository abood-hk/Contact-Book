# 🔸 Contact Book API

Contact Book API is a full-stack web application for managing contacts with a RESTful API backend and interactive frontend interface. Built with Express.js backend with TypeScript and vanilla HTML/CSS/JavaScript frontend, featuring secure data validation, MongoDB integration, and comprehensive CRUD operations.

## 🌐 Live Demo

**Frontend**: [https://contact-book-8mr5.onrender.com/public](https://contact-book-8mr5.onrender.com/public)  
**API Base URL**: https://contact-book-8mr5.onrender.com/api

## 📁 Project Structure

```
Contact Book/
│
├── src/                    → Source code
│   ├── config/            → Configuration files
│   │   └── db.ts         → MongoDB connection
│   ├── controllers/       → Route logic
│   │   ├── contactController.ts  → Contact API endpoints logic
│   │   └── publicController.ts   → Public routes logic
│   ├── middleware/        → Custom middleware
│   │   ├── errorMiddlware.ts    → Error handling
│   │   ├── loggerMiddleware.ts   → Request logging
│   │   └── validateMiddleware.ts → Input validation
│   ├── models/           → Database models
│   │   └── Contact.ts    → Contact schema
│   ├── routes/           → Express routers
│   │   ├── contactRoutes.ts     → Contact API routes
│   │   └── publicRoutes.ts      → Public routes
│   └── server.ts         → App entry point
├── public/               → Static files
│   ├── script/          → JavaScript files
│   │   ├── homeDOM.js   → DOM manipulation
│   │   └── homeRequests.js → API requests
│   └── style/           → CSS files
│       └── homeStyle.css → Main styles
├── views/               → EJS templates
│   └── home.ejs        → Main page template
├── package.json         → Dependencies and scripts
├── tsconfig.json        → TypeScript configuration
└── README.md           → This file
```

## 🚀 Tech Stack

### Backend

- **Server**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Template Engine**: EJS
- **Security**: Helmet.js
- **Validation**: Express-validator
- **Logging**: Custom logger middleware
- **Language**: TypeScript

### Frontend

- **Framework**: Vanilla HTML/CSS/JavaScript
- **Styling**: Custom CSS
- **Real-time**: Form-based API testing

## 🔐 Security & Validation

- **Input Validation**: Express-validator for API endpoints
- **Security Headers**: Helmet.js for enhanced security
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom logger for all incoming requests
- **Type Safety**: TypeScript for compile-time error checking

## 📦 API Endpoints

### Contact Routes

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | `/api/contact` | Get all contacts     |
| POST   | `/api/contact` | Create new contact   |
| PUT    | `/api/contact` | Update contact by ID |
| DELETE | `/api/contact` | Delete contact by ID |

### Request Body (POST/PUT)

```json
{
  "name": "Contact Name",
  "phone": "1234567890",
  "email": "contact@email.com",
  "adress": "Contact Address",
  "notes": "Additional notes"
}
```

### Query Parameters

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| id        | string | MongoDB ObjectId for contact (DELETE/PUT) |
| name      | string | Contact name (GET)                        |
| phone     | string | Phone number (GET)                        |

## 💡 Features

✅ Complete CRUD operations for contacts  
✅ RESTful API with proper HTTP methods  
✅ Interactive web interface for contact management  
✅ Data validation and error handling  
✅ MongoDB integration with Mongoose  
✅ TypeScript for type safety  
✅ Real-time form-based contact management  
✅ Responsive design  
✅ Security headers support  
✅ Cloud deployment on Render  
✅ Contact search functionality  
✅ Phone number validation  
✅ Email validation

## 🛠️ Scripts

```bash
# Install dependencies
npm install

# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Type checking
npm run check

# Build for production
npm run build
```

## 🎨 Frontend Interface

The application includes a user-friendly web interface at `/public` that allows you to:

- Add new contacts with validation
- View all contacts in a responsive layout
- Edit existing contact information
- Delete contacts with confirmation
- Search contacts by name or phone
- View detailed contact information

## 📊 Data Models

### Contact Schema

```typescript
{
  name: String (required, trimmed),
  phone: String (required, 10 digits, unique),
  email: String (optional, lowercase, trimmed),
  adress: String (optional, trimmed),
  notes: String (optional, trimmed),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## ☁️ Deployment

- **Platform**: Render
- **Live URL**: [https://contact-book-8mr5.onrender.com/public](https://contact-book-8mr5.onrender.com/public)
- **Database**: MongoDB Atlas (cloud-hosted)
- **Build Process**: TypeScript compilation to JavaScript

## 🧑‍💻 Author

Made by **Abdulrahman Khatib**

## 📝 License

This project is licensed under the **ISC License**.
