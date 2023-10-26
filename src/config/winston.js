// importando winston
import winston, { format } from 'winston';
import path from 'path';

const { combine, timestamp, label, printf, colorize, prettyPrint } = format;
// level : label : timestamp : message
// eslint-disable-next-line no-underscore-dangle
global.__rootdir = path.resolve(process.cwd());

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Formato para la consola
const myConsoleFormat = combine(
  colorize({ all: true }),
  label({ label: '📣' }),
  // Agregando Fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Función de impreson
  printf(
    (info) =>
      `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`,
  ),
);
// Formato para los archivos
const myFileFormat = combine(
  // Quitando todo tipo de colorizacion
  format.uncolorize(),
  // Tiempo de espera
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Estableciendo la salida en formato Json
  prettyPrint(),
);

// Creando el objeto de opciones para cada transporte
const options = {
  infoFile: {
    level: 'info',
    filename: `${__rootdir}/logs/info.log`,
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'warn',
    filename: `${__rootdir}/logs/warn.log`,
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${__rootdir}/logs/error.log`,
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
};

// Se crea instancia del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
