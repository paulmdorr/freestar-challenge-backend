import Card from '../game/card.js';
import DeckFactory from '../game/deckFactory.js';
import GameBuilder from '../game/gameBuilder.js';
import FaceDownCard from '../game/faceDownCard.js';

function gameToPlainObject(game) {
  return {
    player: {
      name: game.player.name,
      hand: game.player.hand.map(cardToPlainObject),
    },
    dealer: {
      name: game.dealer.name,
      hand: game.dealer.hand.map(cardToPlainObject),
    },
    deck: game.deck.cards.map(cardToPlainObject),
    state: game.state,
  };
}

function cardToPlainObject(card) {
  if (card instanceof FaceDownCard) {
    return {
      rank: card.flip().rank,
      suit: card.flip().suit,
      facedown: true,
    };
  }

  return {
    rank: card.rank,
    suit: card.suit,
  };
}

function plainObjectToGame(plainObject) {
  const gameBuilder = new GameBuilder();

  return gameBuilder
    .setPlayer(
      plainObject.player.name,
      plainObject.player.hand.map(plainObjectToCard),
    )
    .setDealer(plainObject.dealer.hand.map(plainObjectToCard))
    .setState(plainObject.state)
    .setDeck(DeckFactory, plainObject.deck.map(plainObjectToCard))
    .build();
}

function plainObjectToCard(plainObject) {
  const card = new Card(plainObject.rank, plainObject.suit);

  if (plainObject.facedown) {
    return new FaceDownCard(card);
  }
  return card;
}

export { gameToPlainObject, plainObjectToGame };
