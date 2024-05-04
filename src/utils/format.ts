export function formatDecimal(value: number, decimalPlaces: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}
