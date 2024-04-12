import DeckFactory from '../game/deckFactory.js';
import Game from '../game/game.js';
import { gameToPlainObject } from './gamePlainObjectService.js';

function createNewGame(playerName) {
  const game = new Game();
  game.initialiseGame(playerName, DeckFactory);

  return gameToPlainObject(game);
}

function playerHit(game) {
  game.playerHit();

  return gameToPlainObject(game);
}

function playerStand(game) {
  game.playerStand();

  return gameToPlainObject(game);
}

export { createNewGame, playerHit, playerStand };
