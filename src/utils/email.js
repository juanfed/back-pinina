const nodemailer = require("nodemailer");

const sendEmail = async (email, options) => {
  // crear medio de transporte
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE == "true" ? true : false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_SECURE == "true" ? true : false,
    },
  });
  // Cabeceras del mensaje
  const emailOptions = {
    from: `"Pinina" <${process.env.EMAIL_COMPANY}>`, // Direccion remitente
    to: email, // usuario receptor de codigo
    ...options, // parametros asunto y cuerpo del mensaje
  };
  // Enviar mensaje por el medio de transporte definido
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
