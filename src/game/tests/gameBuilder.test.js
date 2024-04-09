import test from 'ava';
import GameBuilder from '../gameBuilder.js';
import { CARD_RANKS, CARD_SUITS } from '../card.js';
import DeckFactory from '../deckFactory.js';

test.before((t) => {
  t.context.playerHand = [
    { rank: CARD_RANKS.ACE, suit: CARD_SUITS.SPADES },
    { rank: CARD_RANKS.TWO, suit: CARD_SUITS.SPADES },
  ];
  t.context.dealerHand = [
    { rank: CARD_RANKS.ACE, suit: CARD_SUITS.SPADES },
    { rank: CARD_RANKS.TWO, suit: CARD_SUITS.SPADES },
  ];
  t.context.deckCards = [
    { rank: CARD_RANKS.ACE, suit: CARD_SUITS.HEARTS },
    { rank: CARD_RANKS.TWO, suit: CARD_SUITS.HEARTS },
  ];
});

test('can build a game', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder.setPlayer('Test Player').build();

  t.is(game.player.name, 'Test Player');
});

test('can build a game with a predefined player hand', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Test Player', t.context.playerHand)
    .build();

  t.is(game.player.name, 'Test Player');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.player.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.player.hand[0].suit, CARD_SUITS.SPADES);
});

test('can build a game with a predefined dealer hand', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Test Player')
    .setDealer(t.context.dealerHand)
    .build();

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.dealer.hand.length, 2);
  t.deepEqual(game.dealer.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.dealer.hand[0].suit, CARD_SUITS.SPADES);
});

test('can build a game with a predefined player and dealer hand', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Test Player', t.context.playerHand)
    .setDealer(t.context.dealerHand)
    .build();

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.player.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.player.hand[0].suit, CARD_SUITS.SPADES);
  t.deepEqual(game.dealer.hand.length, 2);
  t.deepEqual(game.dealer.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.dealer.hand[0].suit, CARD_SUITS.SPADES);
});

test('can build a game with a predefined player and dealer hand and a state', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Test Player', t.context.playerHand)
    .setDealer(t.context.dealerHand)
    .setState('GAME_OVER')
    .build();

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.player.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.player.hand[0].suit, CARD_SUITS.SPADES);
  t.deepEqual(game.dealer.hand.length, 2);
  t.deepEqual(game.dealer.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.dealer.hand[0].suit, CARD_SUITS.SPADES);
  t.is(game.state, 'GAME_OVER');
});

test('can build a game with a predefined deck', (t) => {
  const gameBuilder = new GameBuilder();

  gameBuilder.setDeck(DeckFactory, t.context.deckCards);

  const game = gameBuilder.build();

  t.is(game.deck.cards.length, 2);
  t.is(game.deck.cards[0].rank, CARD_RANKS.ACE);
  t.is(game.deck.cards[0].suit, CARD_SUITS.HEARTS);
  t.is(game.deck.cards[1].rank, CARD_RANKS.TWO);
  t.is(game.deck.cards[1].suit, CARD_SUITS.HEARTS);
});

test('can build a game with a predefined deck, player and dealer hand, and a state', (t) => {
  const gameBuilder = new GameBuilder();

  const game = gameBuilder
    .setPlayer('Test Player', t.context.playerHand)
    .setDealer(t.context.dealerHand)
    .setState('GAME_OVER')
    .setDeck(DeckFactory, t.context.deckCards)
    .build();

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
  t.deepEqual(game.player.hand.length, 2);
  t.deepEqual(game.player.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.player.hand[0].suit, CARD_SUITS.SPADES);
  t.deepEqual(game.dealer.hand.length, 2);
  t.deepEqual(game.dealer.hand[0].rank, CARD_RANKS.ACE);
  t.deepEqual(game.dealer.hand[0].suit, CARD_SUITS.SPADES);
  t.is(game.state, 'GAME_OVER');
  t.is(game.deck.cards.length, 2);
  t.is(game.deck.cards[0].rank, CARD_RANKS.ACE);
  t.is(game.deck.cards[0].suit, CARD_SUITS.HEARTS);
  t.is(game.deck.cards[1].rank, CARD_RANKS.TWO);
  t.is(game.deck.cards[1].suit, CARD_SUITS.HEARTS);
});
