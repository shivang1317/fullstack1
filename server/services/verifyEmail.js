const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  console.log(email);
  if (!otp) {
    return res.status(400).json({ message: "Please enter OTP you received" });
  }
  let user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.isVerified == true)
    return res.status(400).json({ message: `${email} is a verified user.` });

  if (user.otp == otp) {
    user.isVerified = true;
    user.otp = "";
    await user.save();
    return res.status(200).json({ message: "User verified" });
  }
  return res.status(400).json({ message: "Enter correct OTP" });
});

module.exports = { verifyEmail };
