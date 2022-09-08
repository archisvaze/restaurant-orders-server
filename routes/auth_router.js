const express = require("express");
const Managers_Collection = require("../models/manager_schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

let router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;
    console.log("Signup Request received")

    if (!email || !name || !password) {
        return res.status(400).json({
            error: "All fields must be filled"
        })
    }
    const existingUsers = await Managers_Collection.find({ email: email });
    console.log(existingUsers)
    if (existingUsers.length > 0) {
        return res.status(400).json({
            error: "Email Already exists, Signin instead!"
        })
    }

    //generate password Hash
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt)

    //add user to db
    const newUser = new Managers_Collection({
        name,
        email,
        password: hash
    });
    try {
        const savedUser = await newUser.save();
        let safeUser = JSON.parse(JSON.stringify(savedUser));
        safeUser.password = null;
        return res.status(200).json(safeUser)
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login Request received")
    const existingUser = await Managers_Collection.findOne({ email: email });
    if (existingUser == null || existingUser == undefined) {
        return res.status(400).json({
            error: "Email Does Not exists, Signup instead!"
        })
    }
    let user = JSON.parse(JSON.stringify(existingUser))
    const validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
        const payload = {
            id: user._id,
            email: user.email
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN);
        user.password = null;
        return res.status(200).json({ user, accessToken })
    }
    else {
        return res.status(400).json({
            error: "Invalid Password"
        })
    }
})


module.exports = router;