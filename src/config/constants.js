import dotenv from 'dotenv';

dotenv.config();

const devConfig = { MONGO_URL_DEV : process.env.MONGO_URL_DEV, JWT_SECRET: process.env.JWT_SECRET };
const testConfig = {MONGO_URL_TEST: process.env.MONGO_URL_TEST};
const prodConfig = { MONGO_URL_PROD:process.env.MONGO_URL_PROD};

export default{
  homeURL:`${process.env.APP_URL} ${process.env.PORT}`,
  port: process.env.PORT || '3000',
  ip: process.env.IP,
}