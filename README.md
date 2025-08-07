# Todo Application - MERN Stack

A full-stack Todo application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, featuring user authentication and complete CRUD operations for managing todos.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality with JWT tokens
- **Todo Management**: Create, read, update, and delete todos
- **Responsive Design**: Clean and intuitive user interface
- **Protected Routes**: Authentication middleware to secure API endpoints
- **Local Storage**: Persistent user sessions using localStorage
- **Real-time Updates**: Dynamic todo list management

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI library for building user interfaces
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server
- **CSS3** - Styling and responsive design

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
Todoo/
├── backend/                    # Backend server
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── Models/                 # Database models
│   │   ├── TodoModel.js
│   │   └── UserModel.js
│   ├── route/                  # API routes
│   │   ├── LoginRoute.js
│   │   ├── SignupRoute.js
│   │   └── todoRoute.js
│   ├── Schemas/                # Mongoose schemas
│   │   ├── TodoSchema.js
│   │   └── userSchema.js
│   ├── package.json
│   └── server.js               # Main server file
├── frontend/                   # React frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.jsx             # Main app component with routing
│   │   ├── App.css             # Global styles
│   │   ├── Login.jsx           # Login component
│   │   ├── SignUp.jsx          # Signup component
│   │   ├── Todoo.jsx           # Todo management component
│   │   ├── Todoo.css           # Todo component styles
│   │   ├── index.css           # Base styles
│   │   └── main.jsx            # App entry point
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md                   # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Harii2005/todo-react-private.git
   cd Todoo
   ```

2. **Set up the Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**

   Create a `.env` file in the backend directory:

   ```env
   PORT=8080
   MONGO_URL=mongodb://localhost:27017/todoapp
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm start
   ```

   Server will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your account with your credentials
3. **Manage Todos**:
   - Add new todos
   - Mark todos as complete/incomplete
   - Edit existing todos
   - Delete todos
4. **Logout**: Securely logout from your session

## 🔐 API Endpoints

### Authentication

- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Todos (Protected Routes)

- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a specific todo
- `DELETE /api/todos/:id` - Delete a specific todo

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Harikrishnan K R**

- GitHub: [@Harii2005](https://github.com/Harii2005)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for the flexible database solution
- Express.js for the robust backend framework
- Vite for the fast development experience

---

⭐ If you found this project helpful, please give it a star!
