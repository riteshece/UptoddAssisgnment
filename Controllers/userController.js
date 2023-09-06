const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registration
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).send({ status: true, message: 'Registration successful', data: user });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).send({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id }, 'someverysecuredprivatekey', {
        });

        res.status(200).send({ status: true, msg: "login successfully", data: token });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports= {
    register,
    login
}
