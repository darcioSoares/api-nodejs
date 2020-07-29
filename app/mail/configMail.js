const nodemailer = require("nodemailer")

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4f5f46477e1a84",
      pass: "c3e2e6b43e413a"
    }
  });

  module.exports = transport