const User = require("../models/user");

async function registerUser(req, res, next) {
    try {
        const { firstName, lastName, email, password } = req.body;
        //CheckUser
        var user = await User.findOne({ email });

        if (user) {
            return res.send("มีผู้ใช้งานในระบบแล้ว");
        }
        //Encrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        //Save in Database
        await newUser.save();
        res.send("สมัครสมาชิกสำเร็จแล้ว");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports = {
    registerUser
};