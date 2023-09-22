export function formatPrice(price: number): string {
  price *= 1000;
  return price.toLocaleString('vi-VN');
}
