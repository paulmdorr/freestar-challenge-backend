import CardValuesRule from './cardValuesRule.js';

class PointsRule {
  static calculatePoints(hand) {
    return hand.reduce(
      (sum, card) => sum + CardValuesRule.getValue(card.rank, sum),
      0,
    );
  }

  static decideWinner(player, dealer) {
    if (this.#playerWins(player, dealer)) {
      return WINNER_TYPE.PLAYER;
    } else if (this.#dealerWins(player, dealer)) {
      return WINNER_TYPE.DEALER;
    } else {
      return WINNER_TYPE.TIE;
    }
  }

  static isBust(hand) {
    return this.calculatePoints(hand) > 21;
  }

  static hasBlackjack(player) {
    const hand = player.handWithRevealedFacedownCard;

    return hand.length === 2 && this.calculatePoints(hand) === 21;
  }

  static #playerWins(player, dealer) {
    return this.#playerOneWins(player, dealer);
  }

  static #dealerWins(player, dealer) {
    return this.#playerOneWins(dealer, player);
  }

  static #playerOneWins(playerOne, playerTwo) {
    return (
      !this.isBust(playerOne.hand) &&
      (this.isBust(playerTwo.hand) ||
        this.#playerOneWinsByPoints(playerOne, playerTwo) ||
        playerOne.winsByBlackjack(playerTwo))
    );
  }

  static #playerOneWinsByPoints(playerOne, playerTwo) {
    return (
      this.calculatePoints(playerOne.hand) >
      this.calculatePoints(playerTwo.hand)
    );
  }
}

const WINNER_TYPE = Object.freeze({
  PLAYER: 'player',
  DEALER: 'dealer',
  TIE: 'tie',
});

export default PointsRule;
export { WINNER_TYPE };
