const { default: toast } = require('react-hot-toast');

const errorToast = toast.error;
const successToast = toast.success;
const loadingToast = content => {
	toast.loading(content);
};
const removeToast = () => toast.remove(loadingToast());

export { errorToast, successToast, loadingToast, removeToast };
