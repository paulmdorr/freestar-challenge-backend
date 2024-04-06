class Deck {
  #cards;

  constructor(cards) {
    this.#initializeDeck(cards);
  }

  #initializeDeck(cards) {
    this.#cards = cards;
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
