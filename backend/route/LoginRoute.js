const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router({});
const User = require("../Models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET_KEY;


router.post('/login' , async (req , res) =>{
    
    try{
        const {email , password} = req.body;

        // Validate input
        if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Compare password
        const ismatch = await user.comparePassword(password);
        if(!ismatch){
            return res.status(400).json({ error : "Invalid username or password" });
        }
        
        //generate JWT token
        const token = jwt.sign({ id : user_id } , 
            JWT_SECRET,
            {expiresIn : "1hr"}
        );

        // Send response
        res.status(200).json({
            message : "login Successful",
            token,
            user : {
                id : user._id,
                username : user.username,
                email : user.email,
            },
        })
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
});

module.exports = router;