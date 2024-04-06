import Dealer from './dealer.js';
import Player from './player.js';
import PointsRule, { WINNER_TYPE } from './pointsRule.js';

class Game {
  constructor(playerName, deck) {
    this.state = GAME_STATE.PLAYER_TURN;
    this.winner = null;
    this.player = new Player(playerName);
    this.dealer = new Dealer(deck);
    this.#dealInitialCards();
  }

  #dealInitialCards() {
    this.dealer.dealCard(this.player);
    this.dealer.dealCard(this.dealer);
    this.dealer.dealCard(this.player);
    this.dealer.dealCard(this.dealer);

    if (PointsRule.isBlackjack(this.player.hand)) {
      this.state = GAME_STATE.GAME_OVER;
      this.winner = WINNER_TYPE.PLAYER;
    }
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
