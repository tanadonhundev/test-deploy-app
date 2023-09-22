const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
    try {
        //CheckUser
        const { firstName, lastName, email, password } = req.body;

        var user = await User.findOne({ email });

        if (user) {
            return res.send("มีผู้ใช้งานในระบบแล้");
        }
        //Encrypt
        const salt = await bcrypt.genSalt(10);

        user = new User({
            firstName,
            lastName,
            email,
            password,
        });

        user.password = await bcrypt.hash(password, salt);
        //Save in Database
        await user.save();
        res.send("สมัครสมาชิกสำเร็จแล้ว");
    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}

async function loginUser(req, res, next) {
    try {
        // Check User
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Payload
        const payload = {
            user: {
                uid: user._id,
                email: user.email,
            },
        };

        // Generate token
        jwt.sign(payload, 'jwtsecret', { expiresIn: '1800' }, (error, token) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Token generation error" });
            }
            res.json({ token, payload });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

module.exports = {
    registerUser,
    loginUser
};

