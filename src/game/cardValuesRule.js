import { CARD_RANKS } from './card.js';

class CardValuesRule {
  static getValue(rank, total) {
    if (!Object.values(CARD_RANKS).includes(rank)) {
      throw new Error('Invalid card!');
    }

    if (rank === 'A') {
      return total + 11 > 21 ? 1 : 11;
    } else if (rank === 'K' || rank === 'Q' || rank === 'J') {
      return 10;
    } else {
      return parseInt(rank);
    }
  }
}

export default CardValuesRule;
