import test from 'ava';
import Card, { CARD_SUITS } from '../card.js';

test('can create a card', (t) => {
  const card = new Card('A', CARD_SUITS.HEARTS);

  t.is(card.rank, 'A');
  t.is(card.suit, CARD_SUITS.HEARTS);
});

test('throws an error if rank is missing', (t) => {
  const error = t.throws(() => {
    new Card(null, CARD_SUITS.HEARTS);
  });

  t.is(error.message, 'Rank and suit are required!');
});

test('throws an error if suit is missing', (t) => {
  const error = t.throws(() => {
    new Card('A', null);
  });

  t.is(error.message, 'Rank and suit are required!');
});

test('throws an error if rank is invalid', (t) => {
  const error = t.throws(() => {
    new Card('X', CARD_SUITS.HEARTS);
  });

  t.is(error.message, 'Invalid rank!');
});

test('throws an error if suit is invalid', (t) => {
  const error = t.throws(() => {
    new Card('A', 'invalid');
  });

  t.is(error.message, 'Invalid suit!');
});
