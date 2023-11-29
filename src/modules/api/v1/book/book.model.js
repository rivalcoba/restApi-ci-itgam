import mongoose, { Schema } from 'mongoose';
import isISBN from 'isbn3';

const BookSchema = new Schema(
  {
    // Numero de ejemplar
    numberCopie: {
      type: Number,
      required: [true, 'NumberCopie is necessary'],
      trim: true,
    },
    acquisition: {
      type: String,
      unique: true,
      required: [true, 'Acquisition number is necessary'],
      trim: true,
    },
    // Donaciíón , Compra
    acquisitionTypes: {
      type: [
        {
          type: String,
          enum: ['donations', 'purchase'],
          default: ['purchase'],
        },
      ],
      default: ['purchase'],
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Book', BookSchema);
