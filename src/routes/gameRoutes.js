import { Router } from 'express';
import {
  startGame,
  hit,
  hold,
  getGameFromSession,
} from '../controllers/gameController.js';

const router = Router();

router.post('/start', startGame);
router.post('/hit', getGameFromSession, hit);
router.post('/hold', getGameFromSession, hold);

export default router;
