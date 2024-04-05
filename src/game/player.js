class Player {
  #name;
  #hand;

  constructor(name) {
    if (!name || !name.trim()) {
      throw new Error('Name is required!');
    }

    this.#name = name;
    this.#hand = Object.freeze([]);
  }

  get name() {
    return this.#name;
  }

  get hand() {
    return this.#hand;
  }

  addCard(card) {
    this.#hand = Object.freeze([...this.#hand, card]);
  }
}

export default Player;
