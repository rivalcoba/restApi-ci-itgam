import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
/*
import {
  passwordReg
} from './user.validations';
*/
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    // Mongoose Built-in Validators
    required: [true, 'Email is required'],
    trim: true,
    // Mongoose Custom Validators
    validate: {
      validatior(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!',
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
  },
});

export default mongoose.model('User', UserSchema);