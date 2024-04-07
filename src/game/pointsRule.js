import CardValuesRule from './cardValuesRule.js';

class PointsRule {
  static calculatePoints(hand) {
    return hand.reduce(
      (sum, card) => sum + CardValuesRule.getValue(card.rank, sum),
      0,
    );
  }

  static decideWinner(player, dealer) {
    if (player.winsByBlackjackOrPoints(dealer)) {
      return WINNER_TYPE.PLAYER;
    } else if (dealer.winsByBlackjackOrPoints(player)) {
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
}

const WINNER_TYPE = Object.freeze({
  PLAYER: 'player',
  DEALER: 'dealer',
  TIE: 'tie',
});

export default PointsRule;
export { WINNER_TYPE };
