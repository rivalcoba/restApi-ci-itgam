import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passwordReg from './user.validators';
import constants from '../../../../config/constants';

const UserSchema = new Schema({
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: [
      {
        type: String,
        enum: ['user', 'admin', 'attendant'],
        default: ['user'],
      },
    ],
  },
  name: {
    type: String,
    required: [true, 'The Name is required'],
    trim: true,
  },
  secondName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'The Last Name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  schoolMail: {
    type: String,
    unique: true,
    required: [true, 'The School Mail is required'],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator(personalEmail) {
        return validator.isEmail(personalEmail);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  phone: {
    type: String,
    required: [true, 'Número de telefono es necesario'],
    trim: true,
    min: [10, 'Ingrese minimo 10 caracteres'],
    max: [10, ''],
  },
  studentId: {
    type: String,
    unique: true,
    required: [true, 'Número de Control es necesario'],
    trim: true,
    minlength: 7,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: [true, 'Genero necesario'],
    trim: true,
    enum: ['male', 'female'],
  },
  career: {
    type: String,
    required: [true, 'Carrera es necesario'],
    trim: true,
    enum: ['IGEM', 'ITIC', 'IIND', 'ILOG', 'IAMB', 'IFER'],
  },
  password: {
    type: String,
    required: [true, 'Password es necesario'],
    trim: true,
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} contraseña invalida',
    },
  },
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
  authenticateUser(password) {
    return bcrypt.compare(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        name: this.name,
      },
      constants.JWT_SECRET,
    );
  },
  toJSON() {
    return {
      name: this.name,
      schoolMail: this.schoolMail,
      token: `JWT ${this.createToken()}`,
    };
  },
};

export default mongoose.model('User', UserSchema);
