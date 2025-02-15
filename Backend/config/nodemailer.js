const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNotificationToAdmin = async (message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'Nouveau message de contact',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <h3 style="color: #0056b3;">Nouveau message de ${message.name}</h3>
        <p style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${message.email}" style="color: #007bff; text-decoration: none;">${message.email}</a></p>
        <div style="padding: 15px; border: 1px solid #ddd; background-color: #fff; border-radius: 5px;">
          <p style="margin: 0;"><strong>Message:</strong> ${message.message}</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

const sendReplyToUser = async (message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: message.email,
    subject: 'Réponse à votre message',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <p style="margin-bottom: 20px;">Bonjour ${message.name},</p>
        
        <p style="margin-bottom: 20px; line-height: 1.6;">
          Je vous remercie pour votre message et l'intérêt que vous portez à mon profil.
        </p>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin-bottom: 25px; border-left: 4px solid #333;">
          ${message.reply}
        </div>
        
        <p style="margin-top: 30px; margin-bottom: 5px;">Bien cordialement,</p>
        <p style="margin: 0; font-weight: bold;">${process.env.STUDENT_NAME}</p>
        <p style="margin: 0; color: #666;">${process.env.STUDENT_SCHOOL}</p>
        <p style="margin: 0; color: #666; font-style: italic;">${process.env.STUDENT_JOB}</p>
        <p style="margin: 0; color: #666;">${process.env.STUDENT_PHONE}</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendNotificationToAdmin,
  sendReplyToUser
};
