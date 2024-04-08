import Dealer from './dealer.js';
import Player from './player.js';
import PointsRule, { WINNER_TYPE, BLACKJACK_POINTS } from './pointsRule.js';

class Game {
  constructor(playerName, deckFactory) {
    this.state = GAME_STATE.PLAYER_TURN;
    this.winner = null;
    this.player = new Player(playerName);
    this.dealer = new Dealer(deckFactory.createDeck());
    this.#dealInitialCards();
  }

  #dealInitialCards() {
    this.dealer.dealCard(this.player);
    this.dealer.dealCard(this.dealer);
    this.dealer.dealCard(this.player);
    this.dealer.dealCard(this.dealer);

    if (this.player.winsByBlackjack(this.dealer)) {
      this.state = GAME_STATE.GAME_OVER;
      this.winner = WINNER_TYPE.PLAYER;
    }
  }

  playerHit() {
    this.dealer.dealCard(this.player);

    if (this.shouldEndPlayerTurn()) {
      this.playerHold();
    }
  }

  playerHold() {
    this.state = GAME_STATE.DEALER_TURN;
    this.dealerTurn();
  }

  shouldEndPlayerTurn() {
    return (
      PointsRule.isBust(this.player.hand) ||
      PointsRule.calculatePoints(this.player.hand) === BLACKJACK_POINTS
    );
  }

  dealerTurn() {
    while (PointsRule.shouldDealerHit(this.dealer)) {
      this.dealer.dealCard(this.dealer);
    }

    if (
      PointsRule.isBust(this.player.hand) ||
      this.dealer.winsByPoints(this.player)
    ) {
      this.state = GAME_STATE.GAME_OVER;
      this.winner = WINNER_TYPE.DEALER;
    } else if (
      PointsRule.isBust(this.dealer.handWithRevealedFacedownCard) ||
      this.player.winsByPoints(this.dealer)
    ) {
      this.state = GAME_STATE.GAME_OVER;
      this.winner = WINNER_TYPE.PLAYER;
    } else {
      this.state = GAME_STATE.GAME_OVER;
      this.winner = WINNER_TYPE.TIE;
    }
  }
}

const GAME_STATE = Object.freeze({
  PLAYER_TURN: 'playerTurn',
  DEALER_TURN: 'dealerTurn',
  GAME_OVER: 'gameOver',
});

export default Game;
export { GAME_STATE };
