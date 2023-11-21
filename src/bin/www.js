#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
import app from '../app';
import constants from '../config/constants';
import log from '../config/winston';

// Importando funcion para conexión a la Base de Datos
import connectWithRetry from '../database/mongooseConnection';

/**
 * Create HTTP server.
 */
log.info('El servidor se crea a travez de la instancia express');
const server = http.createServer(app);

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

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  log.info(`Listening on ${process.env.APP_URL}:${addr.port} `);
  // APP_URL almacena información como URL, claves secretas
}

// Aplicando funcion para conexión a la Base de Datos
connectWithRetry(constants.MONGO_URL);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
