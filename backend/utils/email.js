const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: `"Wellness Tracker" <${process.env.EMAIL_USER}>`, // sender name + email
    to: email,
    subject: "Your Wellness Tracker OTP Code",
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendOTPEmail };
