export default function useFetch() {
  const fetch = async (apiFunc, onSuccess, onError, final) => {
    try {
      const response = await apiFunc
      onSuccess(response)
    } catch (error) {
      onError(error)
    }
  }

  return fetch
}
