import winston from 'winston';
import path from 'path';

const logDirectory = path.join(process.cwd(), 'logs');

const logger = winston.createLogger({
  level: 'info', 
  transports: [
    new winston.transports.Console({ 
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()   
      )
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'combined.log'), 
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  ]
});

export default logger;