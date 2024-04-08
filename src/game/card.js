const CARD_SUITS = Object.freeze({
  SPADES: 'spades',
  HEARTS: 'hearts',
  DIAMONDS: 'diamonds',
  CLUBS: 'clubs',
});

const CARD_RANKS = Object.freeze({
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: '10',
  J: 'J',
  Q: 'Q',
  K: 'K',
  A: 'A',
});

class Card {
  _rank;
  _suit;

  constructor(rank, suit) {
    this.#checkRankAndSuit(rank, suit);

    this._rank = rank;
    this._suit = suit;
  }

  get rank() {
    return this._rank;
  }

  get suit() {
    return this._suit;
  }

  #checkRankAndSuit(rank, suit) {
    if (!rank || !suit) throw new Error('Rank and suit are required!');

    if (!Object.values(CARD_RANKS).includes(rank)) {
      throw new Error('Invalid rank!');
    }

    if (!CARD_SUITS[suit.toUpperCase()]) throw new Error('Invalid suit!');
  }
}

export default Card;
export { CARD_SUITS, CARD_RANKS };
