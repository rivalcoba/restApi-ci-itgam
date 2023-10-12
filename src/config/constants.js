import dotenv from 'dotenv';

const devConfig = {MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: process.env.JWT_SECRET };
const testConfig = {MONGO_URL: process.env.MONGO_URL_TEST};
const prodConfig = {MONGO_URL: process.env.MONGO_URL_PROD};
//En esta parte esta cargando las variables de entorno del archivo .env
dotenv.config();

const defaultConfig = { PORT: process.env.PORT || 3000 };
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
export default {
  ...defaultConfig,

  ...envConfig(process.env.NODE_ENV),
  
};  