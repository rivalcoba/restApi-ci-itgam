import mongoose, { Schema } from 'mongoose';
// Importando bcrypt
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { log } from 'handlebars';
import * as userValidator from './user.validators';
// Mail sender services
import MailSender from '../../../../services/mailSender';
import constants from '../../../../config/constants';

// Creating Schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      // Built-in Validators
      // Ref: https://mongoosejs.com/docs/validation.html#built-in-validators
      required: [true, 'Email is required!'],
      trim: true,
      // Custom Validators
      // Ref: https://mongoosejs.com/docs/validation.html#custom-validators
      validate: {
        validator(email) {
          userValidator.emailRegex.test(email);
        },
        message: 'You must provide a valid email, received value: {VALUE}',
      },
    },
    firstName: {
      type: String,
      required: [true, 'FirstName is required'],
      trim: true,
      maxLength: [20, 'FirstName must be at most 20 characters long'],
    },
    middleName: {
      type: String,
      required: [true, 'Middlename is required'],
      trim: true,
      maxLength: [20, 'FirstName must be at most 20 characters long'],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: [20, 'FirstName must be at most 20 characters long'],
    },
    username: {
      type: String,
      required: [true, 'Username is required!'],
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
          return userValidator.passwordReg.test(password);
        },
        message: '{VALUE} is not a valid password!',
      },
    },
    emailConfirmationToken: String,
    emailConfirmedAt: Date,
    // Enum schema type with the following allowed values: 'user', 'oeprator', 'admin'
    role: {
      type: String,
      enum: ['user', 'operator', 'admin'],
      default: 'user',
    },
  },
  // Ref: https://mongoosejs.com/docs/guide.html#timestamps
  { timestamps: true }
);

// Adding Plugins to Schema
UserSchema.plugin(uniqueValidator);

// Methods
UserSchema.methods = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },
  async activateUser() {
    await this.updateOne({
      emailConfirmationToken: null,
      emailConfirmedAt: new Date(),
    }).exec();
  },
  createToken() {
    // Payload, JWT secret
    // eslint-disable-next-line
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
  // Edit user
  async editUser(user) {
    await this.updateOne(user).exec();
  },
  // Delete user
  async deleteUser() {
    await this.deleteOne().exec();
  },
  // Update user
  async updateUser(user) {
    await this.updateOne(user).exec();
  },
  // Edit password
  async editPassword(password) {
    await this.updateOne({ password }).exec();
  },
};

// Pre Hooks
UserSchema.pre('save', (error, res, next) => {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  // Generate a 64 character random string
  this.emailConfirmationToken = crypto.randomBytes(64).toString('hex');
  return next();
});

UserSchema.post('updateOne', (error, res, next) => {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.post('save', async () => {
  // Creating Mail Options Objects
  const options = {
    host: constants.SMTP_HOST,
    port: constants.SMTP_PORT,
    secure: false,
    auth: {
      user: constants.MAIL_USER,
      pass: constants.MAIL_PASSWORD,
    },
  };

  const mailSender = new MailSender(options);

  // Configuring Mail data
  mailSender.mail = {
    from: 'jorge.rr@gamadero.tecnm.mx',
    to: this.email,
    subject: 'Email Confirmation',
  };

  // ViewModel
  const viewModel = {
    name: this.firstName,
    middleName: this.middleName,
    email: this.email,
    token: this.emailConfirmationToken,
  };

  const textMail = `
  Estimado ${this.firstName} ${this.middleName} favor de confirmar su cuenta
  en el siguiente enlace: ${this.emailConfirmationToken}
  `;

  // Sending Mail
  try {
    const result = await mailSender.sendMail(
      'confirmation',
      viewModel,
      textMail
    );
    if (!result) log.error('Error sending mail');
    log.info('Mail sent successfully');
    return result;
  } catch (error) {
    log.error(error);
    return null;
  }
});

// Creating and exporting User model
export default mongoose.model('User', UserSchema);
