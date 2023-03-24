export const convertTodoDataByStatus = (arr, key) => {
  return {
    cards: arr.filter((item) => item.status === key),
    cardOrders: arr
      .filter((item) => item.status === key)
      .map((item) => item._id)
  }
}
