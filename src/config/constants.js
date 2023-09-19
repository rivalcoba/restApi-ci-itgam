// ./src/config/constants.js

const defaultConfig = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV,
  };
  
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
  
  module.exports = {
    defaultConfig,
    devConfig ,
    testConfig,
    prodConfig,
  };
  