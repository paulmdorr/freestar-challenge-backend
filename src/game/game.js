import Dealer from './dealer.js';
import Deck from './deck.js';
import Player from './player.js';

class Game {
  constructor(playerName) {
    this.player = new Player(playerName);
    this.dealer = new Dealer('Dealer');
    this.deck = new Deck();
    this.deck.shuffle();
    this.#dealInitialCards();
    this.state = GAME_STATE.PLAYER_TURN;
  }

  #dealInitialCards() {
    this.dealer.dealCard(this.player);
    this.dealer.dealCard(this.dealer);
    this.dealer.dealCard(this.player);
    this.dealer.dealCard(this.dealer);
  }

  playerHit() {
    this.dealer.dealCard(this.player);
  }

  playerHold() {
    this.state = GAME_STATE.DEALER_TURN;
  }
}

const GAME_STATE = Object.freeze({
  PLAYER_TURN: 'playerTurn',
  DEALER_TURN: 'dealerTurn',
  GAME_OVER: 'gameOver',
});

export default Game;
export { GAME_STATE };
