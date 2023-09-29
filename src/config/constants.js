const devConfig = { MONGO_URL_DEV : 'mongodb://localhost:27017/restApi-ci-itgam-dev',
JWT_SECRET: process.env.JWT_SECRET };
const testConfig = {MONGO_URL_TEST: 'mongodb://localhost:27017/restApi-ci-itgam-test',};
const prodConfig = { MONGO_URL_PROD:'mongodb://localhost:27017/restApi-ci-itgam-prod',};

const defaultConfig = { PORT: proceso.env.PORT || 3000 };
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

  