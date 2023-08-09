const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwtSecret = "g3P7k9JL6xv8W5BsC1DfT0nU2mRzQaEY";

router.post(
    "/createuser", [
        body("email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({
            min: 5,
        }),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    }
);

router.post(
    "/loginuser", [
        body("email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({
            min: 5,
        }),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const email = req.body.email;
        try {
            const userData = await User.findOne({ email });
            if (!userData) {
                return res
                    .status(400)
                    .json({ errors: "Invalid credentials. Please try again." });
            }
            const pwdCompare = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            if (!pwdCompare) {
                return res
                    .status(400)
                    .json({ errors: "Invalid credentials. Please try again." });
            }

            const data = {
                user: {
                    id: userData.id,
                },
            };

            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    }
);

router.post("/forgot-password", (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.send({ Status: "User does not exist" });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "uddhavlk@gmail.com",
                pass: "gjfsptfuvcwdbnze",
            },
        });

        const mailOptions = {
            from: "uddhavlk@gmail.com",
            to: `${email}`,
            subject: "Reset Password Link",
            text: `http://localhost:5173/reset-password/${user._id}/${token}`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({ Status: "Success" });
            }
        });
    });
});

router.post("/reset-password/:id/:token", async(req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" });
        } else {
            bcrypt
                .hash(password, salt)
                .then((hash) => {
                    User.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then((u) => res.send({ Status: "Success" }))
                        .catch((err) => res.send({ Status: err }));
                })
                .catch((err) => res.send({ Status: err }));
        }
    });
});

module.exports = router;