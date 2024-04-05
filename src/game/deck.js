import Card, { CARD_SUITS, VALID_RANKS } from './card.js';

class Deck {
  constructor() {
    this.#initializeDeck();
  }

  #initializeDeck() {
    this.cards = [];

    for (const suit of Object.values(CARD_SUITS)) {
      for (const value of VALID_RANKS) {
        this.cards.push(new Card(value, suit));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

export default Deck;
