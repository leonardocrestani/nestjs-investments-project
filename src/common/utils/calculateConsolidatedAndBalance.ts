export default function calculateConsolidatedAndBalance(
  userPosition,
  orderedTrend,
) {
  const alreadyHaveTrend = userPosition.positions.some(
    (position) => orderedTrend.symbol === position.symbol,
  );
  if (alreadyHaveTrend) {
    userPosition.positions.map((position: any) => {
      if (orderedTrend.symbol === position.symbol) {
        position.amount += orderedTrend.amount;
        return position;
      }
    });
  } else {
    userPosition.positions.push(orderedTrend);
  }
  userPosition.checkingAccountAmount = (
    userPosition.checkingAccountAmount -
    orderedTrend.currentPrice * orderedTrend.amount
  ).toFixed(2);
  userPosition.consolidated =
    userPosition.checkingAccountAmount +
    userPosition.positions
      .reduce((valor, position) => {
        return (valor += position.currentPrice * position.amount);
      }, 0)
      .toFixed(2);
  return userPosition;
}
