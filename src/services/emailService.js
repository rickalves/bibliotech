const nodemailer = require('nodemailer');

// Configuração do serviço de envio de e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Provedor de e-mail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Função para enviar o e-mail com HTML formatado
exports.sendRecoveryEmail = async (to, code) => {
  try {
    await transporter.sendMail({
      from: `"Bibliotech 📚" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Recuperação de Senha - Bibliotech 📚',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
          <h1 style="color: #4a90e2; text-align: left;">Recuperação de Senha 🔒</h1>
          <p style="font-size: 16px; color: #333;">Olá,</p>
          <p style="font-size: 16px; color: #333;">
            Você solicitou a recuperação de sua senha no <strong>Bibliotech</strong>. Use o código abaixo para redefinir sua senha:
          </p>
          <div style="font-size: 32px; font-weight: bold; color: #4a90e2; text-align: left; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 14px; color: #999; text-align: left;">
            Este código expira em <strong>10 minutos</strong>.
          </p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            Se você não solicitou essa recuperação, ignore este e-mail.
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar o e-mail.');
  }
};
