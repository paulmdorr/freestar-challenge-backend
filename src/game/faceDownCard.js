class FaceDownCard {
  #card;

  constructor(card) {
    this.#card = card;
  }

  flip() {
    return this.#card;
  }
}

export default FaceDownCard;
