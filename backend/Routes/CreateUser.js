const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwtSecret = "g3P7k9JL6xv8W5BsC1DfT0nU2mRzQaEY";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "uddhavlk@gmail.com",
    pass: "gjfsptfuvcwdbnze",
  },
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authToken = req.body.authToken;
  if (!authToken) {
    return res.status(401).json({ status: "error", data: "Missing authToken" });
  }

  jwt.verify(authToken, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: "error", data: "Token expired" });
    }
    req.user = decoded.user;
    next();
  });
};

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(400).json({ error: "User Already Registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
        userType: req.body.userType,
      };

      await User.create(newUser);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userData = await User.findOne({ email: req.body.email });

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

      const tokenData = {
        user: {
          id: userData.id,
          email: userData.email,
        },
      };

      const authToken = jwt.sign(tokenData, jwtSecret, { expiresIn: "1h" });
      return res.json({
        success: true,
        authToken: authToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
);

router.post("/userData", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ status: "error", data: "User not found" });
    }

    res.json({ status: "ok", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", data: "Internal server error" });
  }
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({ status: "error", data: "User does not exist" });
      }

      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

      const mailOptions = {
        from: "uddhavlk@gmail.com",
        to: email,
        subject: "Reset Password Link",
        text: `http://localhost:5173/reset-password/${user._id}/${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.json({ status: "error", data: "Email sending failed" });
        }
        return res.json({ status: "success", data: "Email sent successfully" });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: "error", data: "Internal server error" });
    });
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.json({ status: "error", data: "Error with token" });
    }

    try {
      const hash = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(id, { password: hash });
      res.json({ status: "success", data: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", data: "Internal server error" });
    }
  });
});

router.get("/userInfo", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
