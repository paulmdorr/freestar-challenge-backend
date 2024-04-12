import { Router } from 'express';
import {
  startGame,
  hit,
  stand,
  getGameFromSession,
} from '../controllers/gameController.js';

const router = Router();

router.post('/start', startGame);
router.post('/hit', getGameFromSession, hit);
router.post('/stand', getGameFromSession, stand);

export default router;
