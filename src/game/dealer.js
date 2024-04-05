import Deck from './deck.js';
import FaceDownCard from './faceDownCard.js';
import Player from './player.js';

class Dealer extends Player {
  #faceDownCard;
  #deck;

  constructor() {
    super('Dealer');

    this.#deck = new Deck();
    this.#deck.shuffle();
  }

  addCard(card) {
    if (this.hand.length === 1) {
      this.#faceDownCard = card;
      super.addCard(new FaceDownCard());
    } else {
      super.addCard(card);
    }
  }

  dealCard(player) {
    player.addCard(this.#deck.getNextCard());
  }
}

export default Dealer;
