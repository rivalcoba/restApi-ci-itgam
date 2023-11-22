// Importando el paquete Dotenv
import dotenv from 'dotenv';

// Cargando configuración del archivo ".env"
dotenv.config();

// Option Objets de configuracion
const devConfig = {
  MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: process.env.JWT_SECRET,
};
const testConfig = {
  MONGO_URL: process.env.MONGO_URL_TEST,
};
const prodConfig = {
  MONGO_URL: process.env.MONGO_URL_PROD,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV,
  SMTP_HOST: process.env.SMTP_HOST,
  SMPT_PORT: process.env.SMPT_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

// Creating config object
export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
