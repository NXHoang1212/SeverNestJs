export const formatPrice = (price: number) => {
  const formattedPrice = price.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedPrice}đ`;
};
