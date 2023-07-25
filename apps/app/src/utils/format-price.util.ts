export function formatPrice(price: number): string {
  // Price receive without 000
  const priceStr = price.toString();
  return (
    priceStr.split('').reduce((prev, curr, idx) => {
      if ((priceStr.length - idx) % 3 === 0 && idx !== 0) {
        prev += `,${curr}`;
      } else {
        prev += curr;
      }

      return prev;
    }, '') + ',000'
  );
}
