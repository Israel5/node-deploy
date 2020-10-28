import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
// import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from '@shared/infra/http/routes';

// Starting Express
const app = express();

// Rate limiter
app.use(rateLimiter);

// Cors
// app.use(cors());

// Make json the default format for requests
app.use(express.json());

// Middlware to server static files
app.use('/files', express.static(uploadConfig.uploadsFolder));

// Load all the routes
app.use(routes);

// Make validations errors display
app.use(errors());

// Global Exception Handler
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

// Make the server listen to the localhost:3333
app.listen(3333, () => {
  console.log('Server started!');
});
