const nodemailer = require('nodemailer');
const { SMTPOptions } = require('../../config/smtp');

class SmtpMailSender {
  constructor() {
    this.transporter = nodemailer.createTransport(SMTPOptions);
  }

  async sendHtmlMail(to, from, subject, html) {
    if (!to) {
      console.error('SMTP: receiver not defined');
      return;
    }
    if (!html) {
      console.error('SMTP: html empty');
      return;
    }
    return this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}

module.exports = new SmtpMailSender();
