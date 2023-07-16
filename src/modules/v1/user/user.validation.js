import { Joi } from 'express-validation';
// Reglas del password en Regex
export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

// Exportando reglas de validacion
export default {
  signUp: {
    body: Joi.object({
      email: Joi.string().email().required().messages({
        'any.required': 'Debe proporcionarse un email valido',
      }),
      password: Joi.string().regex(passwordReg).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      userName: Joi.string().required(),
    }),
  },
};
