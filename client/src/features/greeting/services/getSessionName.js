export const getSessionName = () => {
  const now = new Date()
  let hour = now.getHours()
  return hour < 4
    ? "It's very late"
    : hour < 13
    ? 'Good morning'
    : hour < 18
    ? 'Good afternoon'
    : hour < 22
    ? 'Good evening'
    : "It's very late"
}
