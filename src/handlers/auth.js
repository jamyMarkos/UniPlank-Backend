const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: add role check
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role,
    });

    res.status(201).json({ user });
  } catch (error) {
    console.log("object", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "78h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error during login" });
  }
};
