import dotenv from 'dotenv';
//En esta parte esta cargando las variables de entorno del archivo .env
dotenv.config();

const devConfig = { MONGO_URL_DEV : process.env.MONGO_URL_DEV, JWT_SECRET: process.env.JWT_SECRET };
const testConfig = {MONGO_URL_TEST: process.env.MONGO_URL_TEST};
const prodConfig = { MONGO_URL_PROD:process.env.MONGO_URL_PROD};

const configuration = {
  homeURL: `${process.env.APP_URL}:${process.env.PORT}`,
  port: process.env.PORT,
  ip: process.env.IP,
};

export default configuration;
