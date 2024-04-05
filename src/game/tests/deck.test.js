import test from 'ava';
import Deck from '../deck.js';

test('can create a deck', (t) => {
  const deck = new Deck();

  t.is(deck.cards.length, 52);
});

test('can shuffle a deck', (t) => {
  const deck = new Deck();
  const originalCards = [...deck.cards];

  deck.shuffle();

  t.notDeepEqual(deck.cards, originalCards);
});
