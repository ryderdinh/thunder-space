export const getSessionName = () => {
  const now = new Date()
  const hour = now.getHours()
  return hour >= 4
    ? 'Good morning'
    : hour >= 12
    ? 'Good afternoon'
    : hour >= 18
    ? 'Good evening'
    : `It's very late`
}
