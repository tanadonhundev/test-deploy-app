const User = require("../models/user");

exports.registerUser = async (req, res) => {
    try {
        //CheckUser
        const { firstName, lastName, email, password } = req.body;

        var user = await User.findOne({ email });

        if (user) {
            return res.send("มีผู้ใช้งานในระบบแล้ว");
        }
        //Encrypt
        const salt = await bcrypt.genSalt(10);

        user = new User({
            firstName,
            lastName,
            email,
            password
        });

        user.password = await bcrypt.hash(password, salt);
        //Save in Database
        await user.save();
        res.send("สมัครสมาชิกสำเร็จแล้ว");
    } catch (error) {
        console.log(error);
        res.send("Server Error");
        throw error;
    }
};