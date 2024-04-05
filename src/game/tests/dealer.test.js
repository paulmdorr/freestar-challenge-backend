import test from 'ava';
import Dealer from '../dealer.js';
import FaceDownCard from '../faceDownCard.js';
import Player from '../player.js';

test('can create a dealer', (t) => {
  const dealer = new Dealer();

  t.is(dealer.name, 'Dealer');
  t.deepEqual(dealer.hand, []);
});

test('second card dealt to dealer is face down', (t) => {
  const dealer = new Dealer();

  dealer.dealCard(dealer);
  dealer.dealCard(dealer);

  t.is(dealer.hand[0] instanceof FaceDownCard, false);
});

test('dealer can deal a card', (t) => {
  const dealer = new Dealer();
  const player = new Player('Player 1');

  dealer.dealCard(player);

  t.is(player.hand.length, 1);
});
