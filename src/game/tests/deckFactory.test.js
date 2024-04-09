import test from 'ava';
import DeckFactory from '../deckFactory.js';
import { CARD_RANKS, CARD_SUITS } from '../card.js';

test('can create a deck', (t) => {
  const deck = DeckFactory.createDeck();

  t.is(deck.cards.length, 52);
});

test('can create a deck from a list of cards', (t) => {
  const cards = [];

  for (let suit of Object.values(CARD_SUITS)) {
    for (let rank of Object.values(CARD_RANKS)) {
      cards.push({ rank, suit });
    }
  }

  const deck = DeckFactory.createDeck(cards);

  t.is(deck.cards.length, 52);
  t.is(deck.cards[24].rank, CARD_RANKS.K);
  t.is(deck.cards[24].suit, CARD_SUITS.HEARTS);
});
