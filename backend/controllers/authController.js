const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/email");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, gender, birthdate, weight, height } =
      req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const bmi = weight && height ? weight / (height / 100) ** 2 : null;

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      birthdate,
      weight,
      height,
      bmi,
      otp,
      otpExpires,
      isVerified: false,
    });

    await user.save();

    await sendOTPEmail(email, otp);

    res.status(201).json({ message: "Registered! Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp || user.otpExpires < Date.now())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified)
      return res
        .status(403)
        .json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot password and reset password controllers omitted for brevity, can be added similarly.
