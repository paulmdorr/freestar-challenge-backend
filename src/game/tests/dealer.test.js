import test from 'ava';
import Dealer from '../dealer.js';
import FaceDownCard from '../faceDownCard.js';
import Player from '../player.js';
import Card from '../card.js';
import DeckFactory from '../deckFactory.js';

test.beforeEach((t) => {
  t.context.deck = DeckFactory.createDeck();
});

test('can create a dealer', (t) => {
  const dealer = new Dealer();

  t.is(dealer.name, 'Dealer');
  t.deepEqual(dealer.hand, []);
});

test('second card dealt to dealer is face down', (t) => {
  const dealer = new Dealer();

  dealer.dealCard(dealer, t.context.deck);
  dealer.dealCard(dealer, t.context.deck);

  t.is(dealer.hand[1] instanceof FaceDownCard, true);
});

test('dealer can deal a card', (t) => {
  const dealer = new Dealer();
  const player = new Player('Player 1');

  dealer.dealCard(player, t.context.deck);

  t.is(player.hand.length, 1);
});

test('dealer can reveal face down card', (t) => {
  const dealer = new Dealer();

  dealer.dealCard(dealer, t.context.deck);
  dealer.dealCard(dealer, t.context.deck);
  const hand = dealer.handWithRevealedFacedownCard;

  t.is(hand[1] instanceof Card, true);
});
