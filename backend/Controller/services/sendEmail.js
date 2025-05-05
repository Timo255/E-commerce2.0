const nodemailer = require("nodemailer")

const Email = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const EmailSender = async (link, email) => {
  const options = {
    from: "Mail timothykimari25@gmail.com",
    to: email,
    subject: `Welcome In Mail`,
    html: `
      <p>Click this to rest your Password ${link}</p>  
    `
  };
  Email(options)
};

module.exports = {EmailSender}
