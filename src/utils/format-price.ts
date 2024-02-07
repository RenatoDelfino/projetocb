export function formatPrice(price: number) {
  const formatPrice =
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      price
    )

  return formatPrice
}