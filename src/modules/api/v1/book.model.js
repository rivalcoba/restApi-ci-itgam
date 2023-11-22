import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema({
  NumAdqusición: {
    type: String,
    unique: true,
    required: [true, 'Numero de Adquisición es necesario'],
    trim: true,
  },
  NombreLibro: {
    type: String,
    required: [true, 'Nombre de Libro es necesario'],
    trim: true,
  },
  NombreAuthor: {
    type: String,
    required: [true, 'Nombre Author es necesario'],
    trim: true,
  },
  Editorial: {
    type: String,
    required: [true, 'Editorial es necesario'],
    trim: true,
  },
  Clasificación: {
    type: String,
    unique: true,
    required: [true, 'Clasificación es necesario'],
    trim: true,
  },
  ISBN: {
    type: String,
    unique: true,
    required: [true, 'ISBN es necesario'],
    trim: true,
    minlength: [13, 'ISBN debe tener al menos 13 caracteres'],
    maxlength: [13, 'ISBN no puede tener más de 13 caracteres'],
  },
});

export default mongoose.model('Book', BookSchema);
