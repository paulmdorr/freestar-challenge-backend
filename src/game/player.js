import PointsRule from './pointsRule.js';

class Player {
  #name;
  #hand;
  #points;

  constructor(name, hand = []) {
    this.#checkName(name);

    this.#name = name;
    this.#hand = Object.freeze(hand);
    this.#points = 0;
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

  get points() {
    return this.#points;
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
    return this.points > otherPlayer.points;
  }

  winsByBlackjackOrPoints(otherPlayer) {
    return (
      !PointsRule.isBust(this.handWithRevealedFacedownCard) &&
      (PointsRule.isBust(otherPlayer.handWithRevealedFacedownCard) ||
        this.winsByBlackjack(otherPlayer) ||
        this.winsByPoints(otherPlayer))
    );
  }

  updatePoints() {
    this.#points = PointsRule.calculatePoints(
      this.handWithRevealedFacedownCard,
    );
  }
}

export default Player;
