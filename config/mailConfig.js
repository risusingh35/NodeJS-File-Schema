module.exports = {
    service: process.env.MAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.MAIL_USER || 'your-email@gmail.com',
      pass: process.env.MAIL_PASS || 'your-email-password',
    },
    from: process.env.MAIL_FROM || 'no-reply@myapp.com',
  };
  