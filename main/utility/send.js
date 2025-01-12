const nodemailer = require('nodemailer');
const config = require('config');
const target = config.EMAIL;

async function sendNotification(subject, message) {
  if (!message) {
    return;
  }

  let formattedSubject = typeof subject === 'string' || subject instanceof String ? subject.toUpperCase() : subject;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: target,
    subject: `Thông báo về ${formattedSubject}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Có lỗi khi gửi thông báo.');
    } else {
      console.log('Thông báo đã được gửi thành công');
    }
  });
}
