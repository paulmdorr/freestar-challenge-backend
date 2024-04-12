import Dealer from './dealer.js';
import Game from './game.js';
import Player from './player.js';

class GameBuilder {
  constructor() {
    this.game = new Game();
  }

  setPlayer(playerName, hand = []) {
    this.game.player = new Player(playerName, hand);

    if (hand.length > 0) {
      this.game.player.updatePoints();
    }

    return this;
  }

  setDealer(hand = []) {
    this.game.dealer = new Dealer(hand);

    if (hand.length > 0) {
      this.game.dealer.updatePoints();
    }

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

  setWinner(winner) {
    this.game.winner = winner;

    return this;
  }

  build() {
    return this.game;
  }
}

export default GameBuilder;
