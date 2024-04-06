import { CARD_RANKS } from './card.js';

class CardValuesRule {
  static getValue(card, total) {
    if (!Object.values(CARD_RANKS).includes(card)) {
      throw new Error('Invalid card!');
    }

    if (card === 'A') {
      return total + 11 > 21 ? 1 : 11;
    } else if (card === 'K' || card === 'Q' || card === 'J') {
      return 10;
    } else {
      return parseInt(card);
    }
  }
}

export default CardValuesRule;
