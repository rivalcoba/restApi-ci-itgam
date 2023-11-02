import mongoose from 'mongoose';
import log from '../config/winston';

export default async function connectionToDatabase(mongodbURL) {
  try {
    await mongoose.connect(mongodbURL);
    log.info('Conectando a la Base de Datos...');
  } catch (error) {
    log.error(`❌ No se pudo establecer conexión ${error.message}`);
    log.error('Reintentando la conexión en 20 segundos 🔄');
    setTimeout(() => connectionToDatabase(mongodbURL), 20000);
  }
}
