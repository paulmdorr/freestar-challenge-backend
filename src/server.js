import express from 'express';
import logger from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const { DEBUG_LEVEL, PORT } = process.env;
const app = express();

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
  res.end('hello blackjack!');
});

app.listen(PORT);
