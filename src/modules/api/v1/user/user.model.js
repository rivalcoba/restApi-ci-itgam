import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import * as userValidator from './user.validators';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    // Built-in Validators
    // Ref: https://mongoosejs.com/docs/validation.html#built-in-validators
    required: [true, 'Email is required!'],
    trim: true,
    // Custo Validators
    // Ref: https://mongoosejs.com/docs/validation.html#custom-validators
    validate: {
      validator(email) {
        userValidator.emailRegex.test(email);
      },
      message: 'You must provide a valid email, received value: {VALUE}',
    },
  },
});
