// config/config.js
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_CONNECTION = process.env.DB_CONNECTION || 'mysql';
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || 'sistema_reservas';
export const TOKEN_KEY = process.env.TOKEN_KEY || 'default_secret';
export const MAILGUN_SMTP_USER = process.env.MAILGUN_SMTP_USER;
export const MAILGUN_SMTP_PASSWORD = process.env.MAILGUN_SMTP_PASSWORD;
export const MAILGUN_SMTP_HOST = process.env.MAILGUN_SMTP_HOST;
export const MAILGUN_SMTP_PORT = process.env.MAILGUN_SMTP_PORT;

// Asegúrate de incluir estas líneas si EMAIL_USER y EMAIL_PASS son necesarios
export const EMAIL_USER = process.env.MAILGUN_SMTP_USER;
export const EMAIL_PASS = process.env.MAILGUN_SMTP_PASSWORD;