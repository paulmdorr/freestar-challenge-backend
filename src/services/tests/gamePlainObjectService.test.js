import test from 'ava';
import {
  gameToPlainObject,
  plainObjectToGame,
} from '../gamePlainObjectService.js';
import GameBuilder from '../../game/gameBuilder.js';
import { CARD_RANKS, CARD_SUITS } from '../../game/card.js';
import { GAME_STATE } from '../../game/game.js';
import DeckFactory from '../../game/deckFactory.js';
import FaceDownCard from '../../game/faceDownCard.js';
import { WINNER_TYPE } from '../../game/pointsRule.js';

test.before((t) => {
  t.context.playerHand = [
    { rank: CARD_RANKS.A, suit: CARD_SUITS.SPADES },
    { rank: CARD_RANKS.TWO, suit: CARD_SUITS.HEARTS },
  ];
  t.context.dealerHand = [
    { rank: CARD_RANKS.K, suit: CARD_SUITS.SPADES },
    new FaceDownCard({ rank: CARD_RANKS.FIVE, suit: CARD_SUITS.DIAMONDS }),
  ];
  t.context.dealerHandWithFacedownCard = [
    { rank: CARD_RANKS.K, suit: CARD_SUITS.SPADES },
    { rank: CARD_RANKS.FIVE, suit: CARD_SUITS.DIAMONDS, facedown: true },
  ];
  t.context.deckCards = [
    { rank: CARD_RANKS.A, suit: CARD_SUITS.HEARTS },
    { rank: CARD_RANKS.TWO, suit: CARD_SUITS.HEARTS },
  ];
});

test('can convert a game to plain object', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Test Player', t.context.playerHand)
    .setDealer(t.context.dealerHand)
    .setState(GAME_STATE.PLAYER_TURN)
    .setDeck(DeckFactory, t.context.deckCards)
    .setWinner(WINNER_TYPE.PLAYER)
    .build();

  const expected = {
    player: {
      name: 'Test Player',
      hand: t.context.playerHand,
      points: 13,
    },
    dealer: {
      name: 'Dealer',
      hand: t.context.dealerHandWithFacedownCard,
      points: 15,
    },
    deck: t.context.deckCards,
    state: GAME_STATE.PLAYER_TURN,
    winner: WINNER_TYPE.PLAYER,
  };

  const actual = gameToPlainObject(game);

  t.deepEqual(actual, expected);
});

test('can convert a plain object to a game', (t) => {
  const gameBuilder = new GameBuilder();
  const game = gameBuilder
    .setPlayer('Test Player', t.context.playerHand)
    .setDealer(t.context.dealerHand)
    .setState(GAME_STATE.PLAYER_TURN)
    .setDeck(DeckFactory, t.context.deckCards)
    .setWinner(WINNER_TYPE.PLAYER)
    .build();

  const plainObject = gameToPlainObject(game);
  const gameFromPlainObject = plainObjectToGame(plainObject);

  t.deepEqual(gameFromPlainObject, game);
});
