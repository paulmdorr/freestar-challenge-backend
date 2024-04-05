import test from 'ava';
import Deck from '../deck.js';
import Card from '../card.js';

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

test('can get the next card from a deck', (t) => {
  const deck = new Deck();
  const card = deck.getNextCard();

  t.is(deck.cards.length, 51);
  t.is(card instanceof Card, true);
});

test("can't change the cards in a deck", (t) => {
  const deck = new Deck();
  const cards = deck.cards;

  cards.pop();

  t.is(deck.cards.length, 52);
});
