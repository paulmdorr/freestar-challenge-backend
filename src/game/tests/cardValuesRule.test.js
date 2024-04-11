import test from 'ava';
import CardValuesRule from '../cardValuesRule.js';
import { CARD_RANKS } from '../card.js';

test('returns the correct value for an ace', (t) => {
  t.is(CardValuesRule.getValue(CARD_RANKS.A, 10), 11);
  t.is(CardValuesRule.getValue(CARD_RANKS.A, 11), 1);
});
test('returns the correct value for a face card', (t) => {
  t.is(CardValuesRule.getValue(CARD_RANKS.K), 10);
  t.is(CardValuesRule.getValue(CARD_RANKS.Q), 10);
  t.is(CardValuesRule.getValue(CARD_RANKS.J), 10);
});

test('returns the correct value for a number card', (t) => {
  t.is(CardValuesRule.getValue(CARD_RANKS.TEN), 10);
  t.is(CardValuesRule.getValue(CARD_RANKS.NINE), 9);
  t.is(CardValuesRule.getValue(CARD_RANKS.EIGHT), 8);
  t.is(CardValuesRule.getValue(CARD_RANKS.SEVEN), 7);
  t.is(CardValuesRule.getValue(CARD_RANKS.SIX), 6);
  t.is(CardValuesRule.getValue(CARD_RANKS.FIVE), 5);
  t.is(CardValuesRule.getValue(CARD_RANKS.FOUR), 4);
  t.is(CardValuesRule.getValue(CARD_RANKS.THREE), 3);
  t.is(CardValuesRule.getValue(CARD_RANKS.TWO), 2);
});

test('throws an error if card is invalid', (t) => {
  const error = t.throws(() => {
    CardValuesRule.getValue('X');
  });

  t.is(error.message, 'Invalid card!');
});
