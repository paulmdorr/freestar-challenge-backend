import test from 'ava';
import DeckFactory from '../deckFactory.js';

test('can create a deck', (t) => {
  const deck = DeckFactory.createDeck();

  t.is(deck.cards.length, 52);
});
