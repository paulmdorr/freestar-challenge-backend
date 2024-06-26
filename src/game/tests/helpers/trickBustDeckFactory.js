import Card, { CARD_RANKS, CARD_SUITS } from '../../card.js';
import TrickDeckFactory from './trickDeckFactory.js';

class TrickBustDeckFactory extends TrickDeckFactory {
  static _addTrickCards(cards) {
    return cards.concat([
      new Card(CARD_RANKS.Q, CARD_SUITS.SPADES),
      new Card(CARD_RANKS.J, CARD_SUITS.HEARTS),
      new Card(CARD_RANKS.K, CARD_SUITS.DIAMONDS),
      new Card(CARD_RANKS.K, CARD_SUITS.SPADES),
      new Card(CARD_RANKS.K, CARD_SUITS.HEARTS),
    ]);
  }
}

export default TrickBustDeckFactory;
