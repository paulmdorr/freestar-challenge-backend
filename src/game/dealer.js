import FaceDownCard from './faceDownCard.js';
import Player from './player.js';

class Dealer extends Player {
  constructor() {
    super('Dealer');
  }

  addCard(card) {
    if (this.hand.length === 1) {
      super.addCard(new FaceDownCard(card));
    } else {
      super.addCard(card);
    }
  }

  dealCard(player, deck) {
    player.addCard(deck.getNextCard());
  }

  get handWithRevealedFacedownCard() {
    return [this.hand[0], this.hand[1].flip(), ...this.hand.slice(2)];
  }
}

export default Dealer;
