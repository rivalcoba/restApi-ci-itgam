import passport from 'passport';
// Strategies
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../modules/v1/user/user.model';

// Env
import constants from '../config/constants';

// Options object for local strategy
const localOptions = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      if (!user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

// Optios Object for JWT Strategy
const jwtOptions = {
  /*
  En este caso "authorization" es el nombre
  que debera llevar el campo "Token Prefix"
  en la peticion con Thunder Client en la opcion
  Bearer, el token que va ahi es sin la palabra JWT
  */
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('authorization'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOptions, async (payload, done) => {
  try {
    // Identify User by ID
    // eslint-disable-next-line
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

// Strategy registration
passport.use(localStrategy);
passport.use(jwtStrategy);

// Disabling sessions
const sessionType = {
  session: false,
};

// Create a Middlewares for authentication
export const authLocal = passport.authenticate('local', sessionType);
export const authJWT = passport.authenticate('jwt', sessionType);
