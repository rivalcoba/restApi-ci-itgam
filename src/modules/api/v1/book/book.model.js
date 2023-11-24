import mongoose, { Schema } from 'mongoose';
import Isbn from './book.validators';

const BookSchema = new Schema({
  numberacquisition: {
    type: String,
    unique: true,
    required: [true, 'Numero de Adquisición es necesario'],
    trim: true,
  },
  namebook: {
    type: String,
    required: [true, 'Nombre de Libro es necesario'],
    trim: true,
  },
  nameauthor: {
    type: String,
    required: [true, 'Nombre Author es necesario'],
    trim: true,
  },
  editorial: {
    type: String,
    required: [true, 'Editorial es necesario'],
    trim: true,
  },
  Classification: {
    type: String,
    unique: true,
    required: [true, 'Clasificación es necesario'],
    trim: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: [true, 'ISBN es necesario'],
    trim: true,
    minlength: [13, 'ISBN debe tener al menos 13 caracteres'],
    maxlength: [13, 'ISBN no puede tener más de 13 caracteres'],
    validate: {
      validator(isbn) {
        return Isbn.test(isbn);
      },
      message: '{VALUE La ISBN no es valido',
    },
  },
});

export default mongoose.model('Book', BookSchema);
