import test from 'ava';
import CardValuesRule from '../cardValuesRule.js';

test('returns the correct value for an ace', (t) => {
  const rule = new CardValuesRule();

  t.is(rule.value('A', 10), 11);
  t.is(rule.value('A', 11), 1);
});

test('returns the correct value for a face card', (t) => {
  const rule = new CardValuesRule();

  t.is(rule.value('K'), 10);
  t.is(rule.value('Q'), 10);
  t.is(rule.value('J'), 10);
});

test('returns the correct value for a number card', (t) => {
  const rule = new CardValuesRule();

  t.is(rule.value('10'), 10);
  t.is(rule.value('9'), 9);
  t.is(rule.value('8'), 8);
  t.is(rule.value('7'), 7);
  t.is(rule.value('6'), 6);
  t.is(rule.value('5'), 5);
  t.is(rule.value('4'), 4);
  t.is(rule.value('3'), 3);
  t.is(rule.value('2'), 2);
});
