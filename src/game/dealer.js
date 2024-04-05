import Deck from './deck.js';
import FaceDownCard from './faceDownCard.js';
import Player from './player.js';

class Dealer extends Player {
  #deck;

  constructor() {
    super('Dealer');

    this.#deck = new Deck();
    this.#deck.shuffle();
  }

  addCard(card) {
    if (this.hand.length === 1) {
      super.addCard(new FaceDownCard(card));
    } else {
      super.addCard(card);
    }
  }

  dealCard(player) {
    player.addCard(this.#deck.getNextCard());
  }

  revealFaceDownCard() {
    return this.hand[1].flip();
  }
}

export default Dealer;
