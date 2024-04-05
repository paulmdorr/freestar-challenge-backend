import test from 'ava';
import Card from '../card.js';

test('tests are working!', (t) => {
  const card = new Card('A', 'H');

  t.is(card.rank, 'A');
  t.is(card.suit, 'H');
});
