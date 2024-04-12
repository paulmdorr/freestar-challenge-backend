import { CARD_RANKS } from './card.js';
import CardValuesRule from './cardValuesRule.js';

const WINNER_TYPE = Object.freeze({
  PLAYER: 'player',
  DEALER: 'dealer',
  TIE: 'tie',
});

const BLACKJACK_POINTS = 21;
const DEALER_HIT_THRESHOLD = 17;
const BASE_HAND_SIZE = 2;

class PointsRule {
  static calculatePoints(hand) {
    return this.#sortAcesLast(hand).reduce(
      (sum, card) => sum + CardValuesRule.getValue(card.rank, sum),
      0,
    );
  }

  static #sortAcesLast(hand) {
    const aces = hand.filter((card) => card.rank === CARD_RANKS.A);
    const nonAces = hand.filter((card) => card.rank !== CARD_RANKS.A);

    return [...nonAces, ...aces];
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
    return this.calculatePoints(hand) > BLACKJACK_POINTS;
  }

  static hasBlackjack(player) {
    const hand = player.handWithRevealedFacedownCard;

    return hand.length === BASE_HAND_SIZE && player.points === BLACKJACK_POINTS;
  }

  static shouldDealerHit(dealer) {
    const dealerPoints = this.calculatePoints(
      dealer.handWithRevealedFacedownCard,
    );

    return dealerPoints < DEALER_HIT_THRESHOLD;
  }
}

export default PointsRule;
export { WINNER_TYPE, BLACKJACK_POINTS, DEALER_HIT_THRESHOLD, BASE_HAND_SIZE };
