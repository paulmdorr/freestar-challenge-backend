import {
  createNewGame,
  playerHit,
  playerHold,
} from '../services/gameService.js';
import { plainObjectToGame } from '../services/gamePlainObjectService.js';
import { GAME_STATE } from '../game/game.js';

function startGame(req, res) {
  const game = createNewGame(req.body.playerName);

  if (!req.session.games) {
    req.session.games = {};
  }

  req.session.games = {
    ...req.session.games,
    [req.body.playerName]: game,
  };

  res.json({ game: revealDealerHandIfGameIsOver(game) });
}

function hit(req, res) {
  try {
    const game = playerHit(req.game);

    saveGameToSession(game, req.body.playerName, req.session);

    res.json({ game: revealDealerHandIfGameIsOver(game) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function hold(req, res) {
  try {
    const game = playerHold(req.game);

    saveGameToSession(game, req.body.playerName, req.session);

    res.json({ game: revealDealerHandIfGameIsOver(game) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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

function revealDealerHandIfGameIsOver(game) {
  let newGame = {
    ...game,
    dealer: { ...game.dealer, hand: [...game.dealer.hand] },
  };

  if (newGame.state === GAME_STATE.GAME_OVER) {
    newGame.dealer.hand[1] = { ...newGame.dealer.hand[1], facedown: false };
  } else {
    newGame.dealer.hand[1] = {
      ...newGame.dealer.hand[1],
      rank: null,
      suit: null,
    };
    newGame.dealer.points = null;
  }

  return newGame;
}

export { startGame, hit, hold, getGameFromSession };
