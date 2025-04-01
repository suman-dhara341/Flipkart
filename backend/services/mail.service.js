const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const OTPSend = async (email, OTP) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_ID,
      to: email,
      subject: "OTP Verify",
      text: "OTP",
      html: `<b>Your OTP is ${OTP}</b>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = OTPSend;
