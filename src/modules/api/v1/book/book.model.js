import mongoose, { Schema } from 'mongoose';
import isISBN from 'isbn3';

const BookSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acquisition: {
    type: String,
    unique: true,
    required: [true, 'Acquisition number is necessary'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Book Name is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  editorial: {
    type: String,
    required: [true, 'Editorial is necessary'],
    trim: true,
  },
  classification: {
    type: String,
    unique: true,
    required: [true, 'Classification is necessary'],
    trim: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: [true, 'ISBN is required'],
    trim: true,
    isbn: {
      type: String,
      required: true,
      validate: {
        validator(isbn) {
          // Utilizamos  la función isISBN para validar con isbn3
          return isISBN(isbn);
        },
        message: 'The ISBN provided is not valid..',
      },
    },
  },
});

export default mongoose.model('Book', BookSchema);
