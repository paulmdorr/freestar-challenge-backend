import test from 'ava';
import PointsRule, { WINNER_TYPE } from '../pointsRule.js';
import Card, { CARD_SUITS, CARD_RANKS } from '../card.js';
import Player from '../player.js';

test('calculates points for a hand', (t) => {
  const points = PointsRule.calculatePoints([
    new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.THREE, CARD_SUITS.HEARTS),
  ]);

  t.is(points, 16);
});

test('calculates points for a hand with aces', (t) => {
  const points = PointsRule.calculatePoints([
    new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.A, CARD_SUITS.SPADES),
    new Card(CARD_RANKS.A, CARD_SUITS.DIAMONDS),
  ]);

  t.is(points, 13);
});

test('calculates points for a hand with aces and other cards', (t) => {
  const points = PointsRule.calculatePoints([
    new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.A, CARD_SUITS.SPADES),
    new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.THREE, CARD_SUITS.HEARTS),
  ]);

  t.is(points, 17);
});

test('returns 0 points for an empty hand', (t) => {
  const points = PointsRule.calculatePoints([]);

  t.is(points, 0);
});

test('decides if the hand is a bust', (t) => {
  const isBust = PointsRule.isBust([
    new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.TEN, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.FIVE, CARD_SUITS.HEARTS),
  ]);

  t.true(isBust);
});

test('decides if the hand is not a bust', (t) => {
  const isBust = PointsRule.isBust([
    new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS),
    new Card(CARD_RANKS.THREE, CARD_SUITS.HEARTS),
  ]);

  t.false(isBust);
});

test('decides winner with player winning by points', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.FIVE, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.CLUBS));
  dealer.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.DIAMONDS));
  dealer.addCard(new Card(CARD_RANKS.FOUR, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.PLAYER);
});

test('decides winner with a tie by points', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.THREE, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.CLUBS));
  dealer.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  dealer.addCard(new Card(CARD_RANKS.THREE, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.TIE);
});

test('decides winner with the dealer winning by points', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.THREE, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.CLUBS));
  dealer.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  dealer.addCard(new Card(CARD_RANKS.FOUR, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.DEALER);
});

test('decides winner with the player having a bust', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TEN, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.FIVE, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.SPADES));
  dealer.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  dealer.addCard(new Card(CARD_RANKS.FOUR, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.DEALER);
});

test('decides winner with the dealer having a bust', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.FOUR, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.SPADES));
  dealer.addCard(new Card(CARD_RANKS.TEN, CARD_SUITS.HEARTS));
  dealer.addCard(new Card(CARD_RANKS.FIVE, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.PLAYER);
});

test('decides winner with the player having a blackjack', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.K, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.DIAMONDS));
  dealer.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.PLAYER);
});

test('decides winner with the dealer having a blackjack', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.DIAMONDS));
  dealer.addCard(new Card(CARD_RANKS.K, CARD_SUITS.HEARTS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.DEALER);
});

test('decides winner with the player having a blackjack and the dealer having a blackjack', (t) => {
  const player = new Player('Player');
  const dealer = new Player('Dealer');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.K, CARD_SUITS.HEARTS));

  dealer.addCard(new Card(CARD_RANKS.A, CARD_SUITS.DIAMONDS));
  dealer.addCard(new Card(CARD_RANKS.K, CARD_SUITS.DIAMONDS));

  const winner = PointsRule.decideWinner(player, dealer);

  t.is(winner, WINNER_TYPE.TIE);
});

test('decides if hand is a blackjack', (t) => {
  const player = new Player('Player');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.K, CARD_SUITS.HEARTS));

  const hasBlackjack = PointsRule.hasBlackjack(player);

  t.true(hasBlackjack);
});

test('decides if hand is not a blackjack', (t) => {
  const player = new Player('Player');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));

  const hasBlackjack = PointsRule.hasBlackjack(player);

  t.false(hasBlackjack);
});

test('decides if hand is a blackjack with more than two cards', (t) => {
  const player = new Player('Player');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.K, CARD_SUITS.HEARTS));
  player.addCard(new Card(CARD_RANKS.TWO, CARD_SUITS.HEARTS));

  const hasBlackjack = PointsRule.hasBlackjack(player);

  t.false(hasBlackjack);
});

test('decides if hand is a blackjack with less than two cards', (t) => {
  const player = new Player('Player');

  player.addCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS));

  const hasBlackjack = PointsRule.hasBlackjack(player);

  t.false(hasBlackjack);
});
