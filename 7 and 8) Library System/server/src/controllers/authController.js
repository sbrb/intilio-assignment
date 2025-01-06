const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  

// register user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const { password: userPassword, ...userData } = newUser.toObject();
        res.status(201).json({ status: true, data: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'Internal server error' });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,  
            { expiresIn: '365d' }
        );

        res.status(200).json({ status: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'Internal server error' });
    }
};

module.exports = { register, login };
