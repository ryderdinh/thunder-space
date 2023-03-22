const { default: toast } = require('react-hot-toast')

const errorToast = (content, id) => {
  id ? toast.error(content, { id }) : toast.error()
}
const successToast = (content, id) => {
  id ? toast.success(content, { id }) : toast.success()
}
const loadingToast = (content, id) => {
  id ? toast.loading(content, { id }) : toast.loading(content)
}
const removeToast = () => toast.remove(loadingToast())

export { errorToast, successToast, loadingToast, removeToast }
