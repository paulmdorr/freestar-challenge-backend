import Card, { CARD_RANKS, CARD_SUITS } from '../../card.js';
import TrickDeckFactory from './trickDeckFactory.js';

class TrickNaturalBlackjackDeckFactory extends TrickDeckFactory {
  static _addTrickCards(cards) {
    return cards.concat([
      new Card(CARD_RANKS.A, CARD_SUITS.SPADES),
      new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS),
      new Card(CARD_RANKS.K, CARD_SUITS.SPADES),
    ]);
  }
}

export default TrickNaturalBlackjackDeckFactory;
