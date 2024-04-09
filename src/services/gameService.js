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

function playerHold(game) {
  game.playerHold();

  return gameToPlainObject(game);
}

export { createNewGame, playerHit, playerHold };
