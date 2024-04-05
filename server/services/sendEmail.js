const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const generateOTP = require("./generateOTP");
const User = require("../models/User");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  console.log(email);
  let user = await User.findOne({
    email,
  });

  const otp = generateOTP();

  if (user && user.isVerified == true)
    return res.status(400).json({ message: `${email} is a verified user.` });

  if (user && user.isVerified == false) {
    user = await User.findOne({
      email,
    });
    user.otp = otp;
    await user.save();
  } else {
    user = await User.create({
      email,
      otp,
    });
  }

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Verify your email",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json(error);
    } else {
      return res.json({ user, message: "OTP sent succesfully", status: 200 });
    }
  });
});

module.exports = { sendEmail };
