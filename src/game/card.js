class Card {
  constructor(rank, suit) {
    if (!rank || !suit) throw new Error('Rank and suit are required!');

    if (!VALID_RANKS.includes(rank)) {
      throw new Error('Invalid rank!');
    }

    if (!CARD_SUITS[suit.toUpperCase()]) throw new Error('Invalid suit!');

    this.rank = rank;
    this.suit = suit;
  }
}

const CARD_SUITS = Object.freeze({
  SPADES: 'spades',
  HEARTS: 'hearts',
  DIAMONDS: 'diamonds',
  CLUBS: 'clubs',
});

const VALID_RANKS = Object.freeze([
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
]);

export default Card;
export { CARD_SUITS, VALID_RANKS };
