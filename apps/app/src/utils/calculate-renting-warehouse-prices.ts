export function calculateRentingWarehousePrices(price: number, duration: number) {
  const totalPrice = price * duration;
  const deposit = price * 0.5;
  const remain = totalPrice - deposit;

  return { totalPrice, deposit, remain };
}
