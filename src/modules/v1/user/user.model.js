import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
// Importando bcrypt
import bcrypt from 'bcrypt';
// JWT
// Importando el REGEX del Password
import {
  passwordReg,
} from './user.validation';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    // Mongoose Built-in Validators
    required: [true, 'Email is required'],
    trim: true,
    // Mongoose Custom Validators
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'UserName is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
});

// Methods
UserSchema.methods = {
  // Encripta el password
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },
  createToken() {
    return '';
  },
};

// Hooks
// eslint-disable-next-line prefer-arrow-callback
UserSchema.pre('save', function cb(next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

export default mongoose.model('User', UserSchema);
