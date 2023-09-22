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
        //Check User
        const { email, password } = req.body
        var user = await User.findOne({ email }, { new: true })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.send("รหัสผ่านไม่ถูกต้อง");
            } else {
                //Payload
                var payload = {
                    user: {
                        uid: user._id,
                        email: user.email,
                    }
                }
                //Generate token
                jwt.sign(payload, 'jwtsecret', { expiresIn: '1800' }, (error, token) => {
                    if (error) throw error;
                    res.json({ token, payload })
                });
            }
        } else return res.send("อีเมลไม่ถูกต้อง");

    } catch (error) {
        console.log(error);
        res.send("Server Error");
    };
}

module.exports = {
    registerUser,
    loginUser
};

