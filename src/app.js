import express from 'express';
import logger from 'pino-http';
import dotenv from 'dotenv';
import session from 'express-session';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const { DEBUG_LEVEL, SESSION_SECRET } = process.env;
const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.json());

app.use(
  logger({
    transport: {
      target: DEBUG_LEVEL == 'info' ? 'pino-http-print' : 'pino-pretty',
      options: {
        destination: 1,
        all: true,
        translateTime: true,
      },
    },
  }),
);

app.get('/', (req, res) => {
  res.end('The API is up and running!');
});

app.use('/game', gameRoutes);

export default app;
