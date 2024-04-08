import { CARD_RANKS } from './card.js';
import { BLACKJACK_POINTS } from './pointsRule.js';

const ACE_MIN_VALUE = 1;
const ACE_MAX_VALUE = 11;
const FACE_CARD_VALUE = 10;

class CardValuesRule {
  static getValue(rank, total) {
    if (!Object.values(CARD_RANKS).includes(rank)) {
      throw new Error('Invalid card!');
    }

    if (rank === 'A') {
      return total + ACE_MAX_VALUE > BLACKJACK_POINTS
        ? ACE_MIN_VALUE
        : ACE_MAX_VALUE;
    } else if (rank === 'K' || rank === 'Q' || rank === 'J') {
      return FACE_CARD_VALUE;
    } else {
      return parseInt(rank);
    }
  }
}

export default CardValuesRule;
