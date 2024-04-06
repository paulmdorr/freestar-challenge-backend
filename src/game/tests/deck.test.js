import test from 'ava';
import Card from '../card.js';
import DeckFactory from '../deckFactory.js';

test('can create a deck', (t) => {
  const deck = DeckFactory.createDeck();

  t.is(deck.cards.length, 52);
});

test('can shuffle a deck', (t) => {
  const deck = DeckFactory.createDeck();
  const originalCards = [...deck.cards];

  deck.shuffle();

  t.notDeepEqual(deck.cards, originalCards);
});

test('can get the next card from a deck', (t) => {
  const deck = DeckFactory.createDeck();
  const card = deck.getNextCard();

  t.is(deck.cards.length, 51);
  t.is(card instanceof Card, true);
});

test("can't change the cards in a deck", (t) => {
  const deck = DeckFactory.createDeck();

  const error = t.throws(() => {
    deck.cards.pop();
  });

  t.is(error.message, "Cannot delete property '51' of [object Array]");
});
