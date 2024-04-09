import Dealer from './dealer.js';
import Game from './game.js';
import Player from './player.js';

class GameBuilder {
  constructor() {
    this.game = new Game();
  }

  setPlayer(playerName, hand = []) {
    this.game.player = new Player(playerName, hand);

    return this;
  }

  setDealer(hand = []) {
    this.game.dealer = new Dealer(hand);

    return this;
  }

  setState(state) {
    this.game.state = state;

    return this;
  }

  setDeck(deckFactory, deckCards) {
    this.game.initialiseDeck(deckFactory, deckCards);

    return this;
  }

  build() {
    return this.game;
  }
}

export default GameBuilder;
