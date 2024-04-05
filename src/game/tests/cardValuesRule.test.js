import test from 'ava';
import CardValuesRule from '../cardValuesRule.js';

test('returns the correct value for an ace', (t) => {
  t.is(CardValuesRule.getValue('A', 10), 11);
  t.is(CardValuesRule.getValue('A', 11), 1);
});

test('returns the correct value for a face card', (t) => {
  t.is(CardValuesRule.getValue('K'), 10);
  t.is(CardValuesRule.getValue('Q'), 10);
  t.is(CardValuesRule.getValue('J'), 10);
});

test('returns the correct value for a number card', (t) => {
  t.is(CardValuesRule.getValue('10'), 10);
  t.is(CardValuesRule.getValue('9'), 9);
  t.is(CardValuesRule.getValue('8'), 8);
  t.is(CardValuesRule.getValue('7'), 7);
  t.is(CardValuesRule.getValue('6'), 6);
  t.is(CardValuesRule.getValue('5'), 5);
  t.is(CardValuesRule.getValue('4'), 4);
  t.is(CardValuesRule.getValue('3'), 3);
  t.is(CardValuesRule.getValue('2'), 2);
});

test('throws an error if card is invalid', (t) => {
  const error = t.throws(() => {
    CardValuesRule.getValue('X');
  });

  t.is(error.message, 'Invalid card!');
});
