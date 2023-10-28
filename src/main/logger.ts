import { createLogger, format, transports, Logger } from 'winston';
import { app } from 'electron';

/**
 * Log format
 * @author 996Worker
 */
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
 * Logger instance
 * @author 996Worker
 */
const logger: Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    // Write logs to a log file
    new transports.File({
      filename: `${app.getPath('userData')}/logs/app.log`,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Also log to the console (can be omitted in production)
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
    }),
  ],
});

export default logger;
