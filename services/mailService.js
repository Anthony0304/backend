import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("Error in transporter verification:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export async function enviarMailVerificacion(direccion, token) {
  const mailOptions = {
    from: `Sistema de Gestión de Reservas <anthonyganchozo10@hotmail.com>`, // Usar el correo verificado como remitente
    to: direccion,
    subject: "Verificación de nueva cuenta - Sistema de Gestión de Reservas",
    html: crearMailVerificacion(token),
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Correo de verificación enviado:', info);
  } catch (error) {
    console.error('Error al enviar el correo de verificación:', error);
  }
}

function crearMailVerificacion(token) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <style>
          html {
            background-color: white;
          }
          body {
            max-width: 600px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: auto;
            background-color: rgb(229, 255, 246);
            padding: 40px;
            border-radius: 4px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Verificación de correo electrónico - SISTEMA DE GESTION DE RESERVAS</h1>
        <p>Se ha creado una cuenta con este correo electrónico.</p>
        <p>Si esta cuenta no fue creada por usted, desestime este correo.</p>
        <p>Si usted creó la cuenta, entonces verifique la cuenta <a href="http://localhost:3000/api/verificar/${token}" target="_blank" rel="noopener noreferrer">haciendo click aquí</a>.</p>
        <p><strong>ANTHONY GANCHOZO</strong></p>
        <p>CEO</p>
      </body>
    </html>
  `;
}