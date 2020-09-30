const nodemailer = require("nodemailer")
const dataMailer = require('../../.env')

var transport = nodemailer.createTransport({
    host: dataMailer.mail.host,
    port: dataMailer.mail.port,
    auth: {
      user: dataMailer.mail.user,
      pass: dataMailer.mail.pass
    }
  });

  module.exports = transport