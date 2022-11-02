export const getCheckinStatus = (value) =>
  value <= 0
    ? "You haven't checked in"
    : value > 8
    ? 'Completed'
    : 'Not enough time'
