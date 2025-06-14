const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (err) {
        next(err); // Pass error to the next middleware
    }
});

// Method to generate token
userSchema.methods.generateToken = async function() {
    try {
        return await jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d",
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoose.model("User", userSchema);