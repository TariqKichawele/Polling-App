# 🗳️ Polling App

A full-stack polling application that allows users to create polls, vote, like, and comment on polls. Built with React and Spring Boot.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### User Authentication
- 🔐 User registration and login with JWT authentication
- 🔒 Secure password handling
- 📧 Email notifications when polls are created

### Poll Management
- ➕ Create polls with multiple options
- ⏰ Set expiration dates for polls
- 🗑️ Delete your own polls
- 📊 View poll results with percentage breakdown

### Voting System
- ✅ Vote on any active poll
- 📈 Real-time vote count updates
- 🚫 Prevent duplicate voting
- ⏱️ Automatic poll expiration

### Social Features
- ❤️ Like and unlike polls
- 💬 Comment on polls
- 🗑️ Delete your own comments
- 👤 View poll author details with initials avatar

### Responsive Design
- 📱 Mobile-friendly navigation with drawer menu
- 💻 Responsive card layouts
- 🎨 Modern Material UI design

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Material UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Moment.js** - Date formatting
- **Notistack** - Snackbar notifications
- **js-cookie** - Cookie management
- **jwt-decode** - JWT token decoding

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.5.7** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database ORM
- **JWT (jjwt)** - Token-based authentication
- **Lombok** - Boilerplate reduction
- **Spring Mail** - Email notifications

### Database
- **MySQL 8.0** - Relational database

## 📁 Project Structure

```
polling_app/
├── poll-react/                 # Frontend React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── auth/           # Login & Signup pages
│   │   │   ├── header/         # Navigation header
│   │   │   └── user/           # User pages (Dashboard, Polls, etc.)
│   │   ├── services/           # API service functions
│   │   ├── environment/        # Axios configuration
│   │   └── utility/            # Helper functions
│   └── package.json
│
├── poll-spring-boot/           # Backend Spring Boot application
│   ├── src/main/java/com/poll/
│   │   ├── controllers/        # REST API controllers
│   │   ├── services/           # Business logic
│   │   ├── repositories/       # Data access layer
│   │   ├── entities/           # JPA entities
│   │   ├── dtos/               # Data transfer objects
│   │   ├── config/             # Security & app configuration
│   │   └── util/               # Utility classes
│   └── pom.xml
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.8+

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE poll_db;
```

2. Update the database configuration in `poll-spring-boot/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/poll_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd poll-spring-boot
```

2. Build and run the application:
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd poll-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Polls
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/polls` | Get all polls |
| GET | `/api/user/my-polls` | Get logged-in user's polls |
| GET | `/api/user/poll/details/{pollId}` | Get poll details |
| POST | `/api/user/poll` | Create a new poll |
| DELETE | `/api/user/poll/{pollId}` | Delete a poll |

### Voting & Interactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/poll/vote` | Vote on a poll |
| POST | `/api/user/poll/like/{pollId}` | Like a poll |
| DELETE | `/api/user/poll/unlike/{pollId}` | Unlike a poll |
| POST | `/api/user/poll/comment` | Comment on a poll |
| DELETE | `/api/user/poll/comment/{commentId}` | Delete a comment |

## 📸 Screenshots

### Dashboard
View all polls with voting options and results.

### Create Poll
Create new polls with multiple options and expiration dates.

### Poll Details
View detailed poll information with likes, comments, and voting results.

## 🔧 Configuration

### Email Notifications
To enable email notifications, update the mail configuration in `application.properties`:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> **Note:** For Gmail, you'll need to create an [App Password](https://support.google.com/accounts/answer/185833).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tariq Kichawele**

---

⭐ Star this repository if you found it helpful!

