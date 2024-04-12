import Dealer from './dealer.js';
import Player from './player.js';
import PointsRule, { WINNER_TYPE, BLACKJACK_POINTS } from './pointsRule.js';

class Game {
  #deck;

  constructor() {}

  initialiseGame(playerName, deckFactory) {
    this.state = GAME_STATE.PLAYER_TURN;
    this.winner = null;
    this.player = new Player(playerName);
    this.dealer = new Dealer();
    this.initialiseDeck(deckFactory);
    this.#dealInitialCards();
  }

  #dealInitialCards() {
    this.dealer.dealCard(this.player, this.#deck);
    this.dealer.dealCard(this.dealer, this.#deck);
    this.dealer.dealCard(this.player, this.#deck);
    this.dealer.dealCard(this.dealer, this.#deck);

    if (this.player.winsByBlackjack(this.dealer)) {
      this.state = GAME_STATE.GAME_OVER;
      this.winner = WINNER_TYPE.PLAYER;
    }
  }

  initialiseDeck(deckFactory, deckCards) {
    this.#deck = deckFactory.createDeck(deckCards);
  }

  playerHit() {
    this.#checkIfGameIsOver(this.state);
    this.#checkIfDealerTurn(this.state);
    this.dealer.dealCard(this.player, this.#deck);

    if (this.shouldEndPlayerTurn()) {
      this.playerHold();
    }
  }

  playerHold() {
    this.#checkIfGameIsOver(this.state);
    this.#checkIfDealerTurn(this.state);
    this.state = GAME_STATE.DEALER_TURN;
    this.dealerTurn();
  }

  shouldEndPlayerTurn() {
    return (
      PointsRule.isBust(this.player.hand) ||
      this.player.points === BLACKJACK_POINTS
    );
  }

  dealerTurn() {
    while (PointsRule.shouldDealerHit(this.dealer)) {
      this.dealer.dealCard(this.dealer, this.#deck);
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

  get deck() {
    return this.#deck;
  }

  #checkIfGameIsOver(state) {
    if (state === GAME_STATE.GAME_OVER) {
      throw new Error('Game is over');
    }
  }

  #checkIfDealerTurn(state) {
    if (state === GAME_STATE.DEALER_TURN) {
      throw new Error("It is the dealer's turn");
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
