class CardValuesRule {
  value(card, total) {
    if (card === 'A') {
      return total + 11 > 21 ? 1 : 11;
    } else if (card === 'K' || card === 'Q' || card === 'J') {
      return 10;
    } else {
      return parseInt(card);
    }
  }
}

export default CardValuesRule;
