import PointsRule from './pointsRule.js';

class Player {
  #name;
  #hand;

  constructor(name) {
    this.#checkName(name);

    this.#name = name;
    this.#hand = Object.freeze([]);
  }

  get name() {
    return this.#name;
  }

  get hand() {
    return this.#hand;
  }

  get handWithRevealedFacedownCard() {
    return this.#hand;
  }

  addCard(card) {
    this.#hand = Object.freeze([...this.#hand, card]);
  }

  #checkName(name) {
    if (!name || !name.trim()) {
      throw new Error('Name is required!');
    }
  }

  winsByBlackjack(otherPlayer) {
    return (
      PointsRule.hasBlackjack(this) && !PointsRule.hasBlackjack(otherPlayer)
    );
  }

  winsByPoints(otherPlayer) {
    return (
      PointsRule.calculatePoints(this.handWithRevealedFacedownCard) >
      PointsRule.calculatePoints(otherPlayer.handWithRevealedFacedownCard)
    );
  }

  winsByBlackjackOrPoints(otherPlayer) {
    return (
      !PointsRule.isBust(this.handWithRevealedFacedownCard) &&
      (PointsRule.isBust(otherPlayer.handWithRevealedFacedownCard) ||
        this.winsByBlackjack(otherPlayer) ||
        this.winsByPoints(otherPlayer))
    );
  }
}

export default Player;
