import Card, { CARD_SUITS, VALID_RANKS } from './card.js';

class Deck {
  #cards;

  constructor() {
    this.#initializeDeck();
  }

  #initializeDeck() {
    this.#cards = [];

    for (const suit of Object.values(CARD_SUITS)) {
      for (const value of VALID_RANKS) {
        this.#cards.push(new Card(value, suit));
      }
    }

    Object.freeze(this.#cards);
  }

  shuffle() {
    this.#cards = [...this.#cards];

    for (let i = this.#cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }

    Object.freeze(this.#cards);
  }

  getNextCard() {
    this.#cards = [...this.#cards];
    const card = this.#cards.pop();
    Object.freeze(this.#cards);

    return card;
  }

  get cards() {
    return this.#cards;
  }
}

export default Deck;
