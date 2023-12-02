// Importando biblioteca de validacion
import Joi from 'joi';

export default {
  record: {
    /// drink: Joi.string().enum().trim().required('Coffee Tea'),
    acquisition: Joi.string()
      .trim()
      .required('Acquisition number is necessary'),
    title: Joi.string().trim().required('Book Name is required').trim(),
    author: Joi.string().trim().required('Author name is required'),
    publishert: Joi.string().trim().required('Editorial is necessary'),
    classification: Joi.string().trim().required('Classification is necessary'),
    isbn: Joi.string().trim().required('ISBN is required').unique(),
  },
};
