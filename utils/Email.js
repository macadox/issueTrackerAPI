const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.firstName = user.name.split(' ')[0];
    this.to = user.email;
    this.from = `Maciej Okniński <${process.env.EMAIL_FROM}>`;
    this.url = url;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // implement sendgrid after
    }
    return nodemailer.createTransport({
      host: process.env.SMTP_HOSTNAME,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) prepare template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    })

    // 2) prepare options object
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.fromString(html),
      html
    };
    // 3) prepare and send transport
    await this.newTransport().sendMail(mailOptions)
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to IssueTracker!')
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token for IssueTracker (valid 1h)')
  }
};

