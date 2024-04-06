import test from 'ava';
import Player from '../player.js';
import Card, { CARD_SUITS, CARD_RANKS } from '../card.js';

test('can create a player', (t) => {
  const player = new Player('Player 1');

  t.is(player.name, 'Player 1');
  t.deepEqual(player.hand, []);
});

test('throws an error if name is missing', (t) => {
  const error = t.throws(() => {
    new Player();
  });

  t.is(error.message, 'Name is required!');
});

test('throws an error if name is empty', (t) => {
  const error = t.throws(() => {
    new Player('');
  });

  t.is(error.message, 'Name is required!');
});

test('throws an error if name is whitespace', (t) => {
  const error = t.throws(() => {
    new Player(' ');
  });

  t.is(error.message, 'Name is required!');
});

test('throws an error if name is null', (t) => {
  const error = t.throws(() => {
    new Player(null);
  });

  t.is(error.message, 'Name is required!');
});

test("name can't be changed", (t) => {
  const player = new Player('Player 1');

  const error = t.throws(() => {
    player.name = 'Player 2';
  });

  t.is(
    error.message,
    'Cannot set property name of #<Player> which has only a getter',
  );
});

test("hand can't be changed", (t) => {
  const player = new Player('Player 1');

  const error = t.throws(() => {
    player.hand = [];
  });

  t.is(
    error.message,
    'Cannot set property hand of #<Player> which has only a getter',
  );
});

test("can't modify the hand directly", (t) => {
  const player = new Player('Player 1');

  const error = t.throws(() => {
    player.hand.push(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  });

  t.is(error.message, 'Cannot add property 0, object is not extensible');
});

test('can add a card to the hand', (t) => {
  const player = new Player('Player 1');
  const card = new Card(CARD_RANKS.A, CARD_SUITS.HEARTS);

  player.addCard(card);

  t.deepEqual(player.hand, [card]);
});

test('can add multiple cards to the hand', (t) => {
  const player = new Player('Player 1');
  const cards = [
    new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS),
  ];

  player.addCard(cards[0]);
  player.addCard(cards[1]);

  t.deepEqual(player.hand, cards);
});
