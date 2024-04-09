import Card, { CARD_RANKS, CARD_SUITS } from './card.js';
import Deck from './deck.js';

class DeckFactory {
  static createDeck(cards = []) {
    if (cards?.length) {
      return new Deck(cards);
    }

    Object.values(CARD_SUITS).forEach((suit) => {
      Object.values(CARD_RANKS).forEach((value) => {
        cards.push(new Card(value, suit));
      });
    });

    const deck = new Deck(cards);
    deck.shuffle();

    return deck;
  }
}

export default DeckFactory;
