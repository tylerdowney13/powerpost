const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/// REGISTER ///
router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
    });

    // Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.json(error.code);
  }
});

/// LOGIN ///
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json("User not found");
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(404).json("Invalid password");
    return;
  }

  res.status(200).json(user);
});

module.exports = router;
