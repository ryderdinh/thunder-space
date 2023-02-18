export const getPercent = (currentValue, max) =>
  (currentValue / max) * 100 > 100 ? 100 : (currentValue / max) * 100
