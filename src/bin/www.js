#!/usr/bin/env node

/**
 * Module dependencies.
 */

import Debug from 'debug';
import constants from '../config/constants';
import Database from '../config/database';

const debug = Debug('restapi-ci-itgam:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Get port from environment and store in Express.
const port = normalizePort(constants.PORT);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Starting Server
function startServer(dbConnection) {
  import('../app').then((module) => {
    // Importa el modulo por defecto
    const app = module.default;

    function onListening() {
      const addr = app.address();
      const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
      debug(`Listening on ${bind}`);
    }

    app.set('port', port);

    // Setting some events
    app.on('error', onError);
    app.on('listening', onListening);

    // Store the dbConnection in the app
    app.set('dbConnection', dbConnection);

    // Listen on provided port, on all network interfaces.
    app.listen(port);
  });
}

// IIFE
(async () => {
  // Creating the database instance
  const database = new Database(constants.MONGO_URL);
  try {
    // Connecting to the database
    const dbConnection = await database.connect();
    if (dbConnection) {
      debug(`🛢️ Conexión exitosa a la base de datos: ${constants.MONGO_URL} 🛢️`);
    }
    // Iniciando el servidor
    startServer(dbConnection);
  } catch (error) {
    debug(`Error www.js ln 100: ${error.message}`);
  }
})();
