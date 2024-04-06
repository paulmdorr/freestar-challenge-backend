import Card, { CARD_RANKS, CARD_SUITS } from '../card.js';
import Deck from '../deck.js';

class TrickDeckFactory {
  static createDeck() {
    const cards = [];

    for (let suit of Object.values(CARD_SUITS)) {
      for (let rank of Object.values(CARD_RANKS)) {
        cards.push(new Card(rank, suit));
      }
    }

    // Add a natural for the player
    cards.push(new Card(CARD_RANKS.A, 'Spades'));
    cards.push(new Card(CARD_RANKS.TWO, 'Hearts'));
    cards.push(new Card(CARD_RANKS.K, 'Spades'));

    return new Deck(cards);
  }
}

export default TrickDeckFactory;
