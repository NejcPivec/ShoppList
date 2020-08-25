const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middleware/auth");

const User = require("../models/User");

// @route   GET api/auth
// @desc    Get Logged in user
// @access  Private -> to dosežemo tako da dodamo auth(middlevare) kot drugi parameter
router.get("/", auth, async (req, res) => {
  try {
    // Get user form database
    const user = await User.findById(req.user.id).select("-password"); // we dont want to return the password

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token (Login)
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destruc
    const { email, password } = req.body;

    try {
      // find if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // if there is a user
      const isMatch = await bcrypt.compare(password, user.password);

      // if the passwords don't match
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // if the passwords match
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
