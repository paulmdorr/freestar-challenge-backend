import FaceDownCard from './faceDownCard.js';
import Player from './player.js';

class Dealer extends Player {
  constructor(hand = []) {
    super('Dealer', hand);
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
    player.updatePoints();
  }

  get handWithRevealedFacedownCard() {
    if (this.hand.length < 2) {
      return this.hand;
    }

    return [this.hand[0], this.hand[1].flip(), ...this.hand.slice(2)];
  }
}

export default Dealer;
