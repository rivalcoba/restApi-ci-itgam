import mongoose from 'mongoose';
import Debug from 'debug';

const debug = Debug('restapi-ci-itgam');

class Database {
  constructor(connectionString) {
    this.connection = null;
    this.connectionString = connectionString;
  }

  // Methods
  async connect() {
    // Ensuring there is not another instance
    if (this.connection) {
      return this.connection;
    }
    try {
      debug(`📞📞 Conectando a la base de datos ...${this.connectionString}`);
      this.connection = await mongoose.connect(this.connectionString);
      return this.connection;
    } catch (error) {
      debug(
        `🥀 No se pudo establecer conexión a la base de datos debido a: ${error.message} 🥀`,
      );
      return null;
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.disconnect();
      this.connection = null;
    } else {
      debug('No active connection to disconnect');
    }
  }
}

export default Database;
