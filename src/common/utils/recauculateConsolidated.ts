export default function recauculateConsolidated(user) {
  const newConsolidated = user.positions.reduce((valor, position) => {
    return (valor += position.currentPrice * position.amount);
  }, 0);
  user.consolidated = (newConsolidated + user.checkingAccountAmount).toFixed(2);
  return user;
}
