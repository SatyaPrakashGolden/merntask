const authController = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email });
        if (isExisting) {
            throw new Error("Already such an account. Try a different email");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User.create({ ...req.body, password: hashedPassword });


        const { password, ...others } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        return res.status(201).json({ user: others, token });
    } catch (error) {
        return res.status(500).json(error);
    }
});





authController.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password);

        if (!comparePass) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });


        const { password, ...userWithoutPassword } = user._doc;

        return res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        
        return res.status(500).json({ message:error });
    }
});

module.exports = authController