const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;
const cors = require('cors');
const loginRoute = require('./route/LoginRoute');
const signUpRoute = require('./route/SignupRoute');
const todoRoute = require('./route/todoRoute');
const authenticate = require('./middleware/authMiddleware');

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies


// Protected routes - require authentication
app.use('/api/todos', authenticate, todoRoute);


// Routes
app.use('/api', loginRoute);
app.use('/api', signUpRoute);

// Home route
app.get('/', (req, res) => {
    res.send('API is running...');
});


app.get('/' , (req , res) => {
    res.send('home route');
});


app.listen(port , () => {
    console.log(`listing to port : ${port}`);
    mongoose.connect(URL);
    console.log("DB conncted");
})


// app.get('/')

// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token

//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }

//     const token = jwt.sign(data, jwtSecretKey);
//     res.send(token);
// });