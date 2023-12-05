import mongoose, { Schema } from 'mongoose';
import isISBN from 'isbn3';
// Crear un documento
const BookSchema = new Schema(
  {
    acquisition: {
      type: String,
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
    publishert: {
      type: String,
      required: [true, 'Editorial is necessary'],
      trim: true,
    },
    classification: {
      type: String,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model('Book', BookSchema);
