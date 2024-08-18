require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is imported
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// JSON Web Token secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Method to generate JWT token
userSchema.methods.generateToken = function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            JWT_SECRET_KEY,
            { expiresIn: "30d" }
        );
    } catch (error) {
        console.error(error);
    }
};

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
