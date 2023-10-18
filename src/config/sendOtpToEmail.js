import ENV from "./keys.js";
import sendGrid from "@sendgrid/mail";
sendGrid.setApiKey(ENV.SENDGRID.API_SECRET_KEY);

const sendEmail = (email, otp) => {
  let otpMessage;
  if (otp.length === 6) {
    otpMessage = "Hello, your OTP is " + otp + " Do not share anyone!";
  }
  console.log(otpMessage);
  const msg = {
    to: email,
    from: {
      name: "Professor",
      email: ENV.SENDGRID.FROM,
    },
    subject: "Code from Usama",
    html: otp,
    text: "Otp",
  };
  return sendGrid.send(msg);
};

export default sendEmail;
