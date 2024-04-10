import {
  createNewGame,
  playerHit,
  playerHold,
} from '../services/gameService.js';
import { plainObjectToGame } from '../services/gamePlainObjectService.js';

function startGame(req, res) {
  const game = createNewGame(req.body.playerName);

  if (!req.session.games) {
    req.session.games = {};
  }

  req.session.games = {
    ...req.session.games,
    [req.body.playerName]: game,
  };
  res.json({ game });
}

function hit(req, res) {
  try {
    const game = playerHit(req.game);

    saveGameToSession(game, req.body.playerName, req.session);

    res.json({ game });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function hold(req, res) {
  const game = playerHold(req.game);

  saveGameToSession(game, req.body.playerName, req.session);

  res.json({ game });
}

function saveGameToSession(game, playerName, session) {
  session.games = {
    ...session.games,
    [playerName]: game,
  };
}

function getGameFromSession(req, res, next) {
  const playerName = req.body.playerName;

  if (!Object.keys(req.session.games).includes(playerName)) {
    res.status(404).json({ message: 'Game not found' });
  } else {
    req.game = plainObjectToGame(req.session.games[playerName]);
    next();
  }
}

export { startGame, hit, hold, getGameFromSession };
