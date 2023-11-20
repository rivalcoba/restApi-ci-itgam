import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  primerNombre: {
    type: String,
    required: [true, 'Primer Nombre es requerido'],
    trim: true,
  },
  segundoNombre: {
    type: String,
    trim: true,
  },
  primerApellido: {
    type: String,
    required: [true, 'Primer Apellido es necesario'],
    trim: true,
  },
  segundoApellido: {
    type: String,
    required: [true, 'Segundo Apellido es necesario'],
    trim: true,
  },
  correoInstitucional: {
    type: String,
    unique: true,
    required: [true, 'Correo Institucional es necesario'],
    trim: true,
  },
  correoAlternativo: {
    type: String,
    trim: true,
  },
  noTelefono: {
    type: String,
    required: [true, 'Número de telefono es necesario'],
    trim: true,
  },
  noControl: {
    type: String,
    unique: true,
    required: [true, 'Número de Control es necesario'],
    trim: true,
  },
  genero: {
    type: String,
    required: [true, 'Genero necesario'],
    trim: true,
  },
  carrera: {
    type: String,
    required: [true, 'Carrera es necesario'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password es necesario'],
    trim: true,
  },
});

export default mongoose.model('User', UserSchema);
