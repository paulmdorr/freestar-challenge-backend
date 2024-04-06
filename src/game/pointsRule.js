import CardValuesRule from './cardValuesRule.js';

class PointsRule {
  static calculatePoints(hand) {
    return hand.reduce(
      (sum, card) => sum + CardValuesRule.getValue(card.rank, sum),
      0,
    );
  }

  static decideWinner(playerHand, dealerHand) {
    if (this.#playerWins(playerHand, dealerHand)) {
      return WINNER_TYPE.PLAYER;
    } else if (this.#dealerWins(playerHand, dealerHand)) {
      return WINNER_TYPE.DEALER;
    } else {
      return WINNER_TYPE.TIE;
    }
  }

  static isBust(hand) {
    return this.calculatePoints(hand) > 21;
  }

  static isBlackjack(hand) {
    return hand.length === 2 && this.calculatePoints(hand) === 21;
  }

  static #playerWins(playerHand, dealerHand) {
    return this.#playerOneWins(playerHand, dealerHand);
  }

  static #dealerWins(playerHand, dealerHand) {
    return this.#playerOneWins(dealerHand, playerHand);
  }

  static #playerOneWins(playerOne, playerTwo) {
    return (
      !this.isBust(playerOne) &&
      (this.isBust(playerTwo) ||
        this.#playerOneWinsByPoints(playerOne, playerTwo) ||
        this.#playerOneWinsByBlackjack(playerOne, playerTwo))
    );
  }

  static #playerOneWinsByPoints(playerOne, playerTwo) {
    return this.calculatePoints(playerOne) > this.calculatePoints(playerTwo);
  }

  static #playerOneWinsByBlackjack(playerOne, playerTwo) {
    return this.isBlackjack(playerOne) && !this.isBlackjack(playerTwo);
  }
}

const WINNER_TYPE = Object.freeze({
  PLAYER: 'player',
  DEALER: 'dealer',
  TIE: 'tie',
});

export default PointsRule;
export { WINNER_TYPE };
