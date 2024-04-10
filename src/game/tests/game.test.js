import test from 'ava';
import Game, { GAME_STATE } from '../game.js';
import { WINNER_TYPE } from '../pointsRule.js';
import DeckFactory from '../deckFactory.js';
import TrickBustDeckFactory from './helpers/trickBustDeckFactory.js';
import TrickNaturalBlackjackDeckFactory from './helpers/trickNaturalBlackjackDeckFactory.js';
import TrickDealerWinsDeckFactory from './helpers/trickDealerWinsDeckFactory.js';
import TrickNotBustDeckFactory from './helpers/trickNotBustDeckFactory.js';
import TrickPlayerWinsDeckFactory from './helpers/trickPlayerWinsDeckFactory.js';
import TrickTieDeckFactory from './helpers/trickTieDeckFactory.js';
import GameBuilder from '../gameBuilder.js';
import Card, { CARD_RANKS, CARD_SUITS } from '../card.js';
import FaceDownCard from '../faceDownCard.js';

test('can create a game', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', DeckFactory);

  t.is(game.player.name, 'Test Player');
  t.is(game.dealer.name, 'Dealer');
});

test('player can hit', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', DeckFactory);

  game.playerHit();

  t.is(game.player.hand.length, 3);
});

test('player can hold', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickBustDeckFactory);

  game.playerHold();

  t.is(game.player.hand.length, 2);
  t.is(game.state, GAME_STATE.GAME_OVER);
});

test('game was just created and player has a blackjack', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickNaturalBlackjackDeckFactory);

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.PLAYER);
});

test('player hits and busts', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickBustDeckFactory);

  game.playerHit();

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.DEALER);
});

test("player hits and it's not a bust", (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickNotBustDeckFactory);

  game.playerHit();

  t.is(game.state, GAME_STATE.PLAYER_TURN);
});

test('player holds and dealer wins', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickDealerWinsDeckFactory);

  game.playerHold();

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.DEALER);
});

test('player hits and wins', (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickPlayerWinsDeckFactory);

  game.playerHit();

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.PLAYER);
});

test("player holds and it's a tie", (t) => {
  const game = new Game();
  game.initialiseGame('Test Player', TrickTieDeckFactory);

  game.playerHold();

  t.is(game.state, GAME_STATE.GAME_OVER);
  t.is(game.winner, WINNER_TYPE.TIE);
});

test('can set deck factory and cards list', (t) => {
  const game = new Game();
  const deckCards = [
    { rank: 'A', suit: 'HEARTS' },
    { rank: '2', suit: 'HEARTS' },
  ];

  game.initialiseDeck(DeckFactory, deckCards);

  t.is(game.deck.cards.length, 2);
  t.is(game.deck.cards[0].rank, 'A');
  t.is(game.deck.cards[0].suit, 'HEARTS');
  t.is(game.deck.cards[1].rank, '2');
  t.is(game.deck.cards[1].suit, 'HEARTS');
});

test('can set deck factory and no cards list', (t) => {
  const game = new Game();

  game.initialiseDeck(DeckFactory);

  t.is(game.deck.cards.length, 52);
});

test("player can't hit if game is over", (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Player 1')
    .setDealer()
    .setState(GAME_STATE.GAME_OVER)
    .setDeck(DeckFactory)
    .build();

  const error = t.throws(() => game.playerHit());

  t.is(error.message, 'Game is over');
});

test("player can't hold if game is over", (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Player 1')
    .setDealer()
    .setState(GAME_STATE.GAME_OVER)
    .setDeck(DeckFactory)
    .build();

  const error = t.throws(() => game.playerHold());

  t.is(error.message, 'Game is over');
});

test("player can't hit if it's dealer turn", (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Player 1')
    .setDealer([
      new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
      new FaceDownCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS)),
    ])
    .setState(GAME_STATE.DEALER_TURN)
    .setDeck(DeckFactory)
    .build();

  const error = t.throws(() => game.playerHit());

  t.is(error.message, "It is the dealer's turn");
});

test("player can't hold if it's player turn", (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Player 1')
    .setDealer([
      new Card(CARD_RANKS.A, CARD_SUITS.HEARTS),
      new FaceDownCard(new Card(CARD_RANKS.A, CARD_SUITS.HEARTS)),
    ])
    .setState(GAME_STATE.DEALER_TURN)
    .setDeck(DeckFactory)
    .build();

  const error = t.throws(() => game.playerHold());

  t.is(error.message, "It is the dealer's turn");
});
