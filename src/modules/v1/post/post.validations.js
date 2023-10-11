import { Joi } from 'express-validation';

export default {
  createPost: {
    body: Joi.object({
      title: Joi.string().min(3).required().messages({
        'string.min': 'Title must be at least 3 characters long',
        'any.required': 'Title is required',
      }),
      text: Joi.string().min(3).required().messages({
        'string.min': 'Text must be at least 3 characters long',
        'any.required': 'Text is required',
      }),
    }),
  },
};
