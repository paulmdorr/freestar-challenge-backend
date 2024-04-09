import Card, { CARD_RANKS, CARD_SUITS } from '../../card.js';
import Deck from '../../deck.js';
import DeckFactory from '../../deckFactory.js';

//Abstract
class TrickDeckFactory extends DeckFactory {
  static createDeck() {
    let cards = [];

    for (let suit of Object.values(CARD_SUITS)) {
      for (let rank of Object.values(CARD_RANKS)) {
        cards.push(new Card(rank, suit));
      }
    }

    //Called in the subclasses
    cards = this._addTrickCards(cards);

    return new Deck(cards);
  }
}

export default TrickDeckFactory;
