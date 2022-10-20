const { default: toast } = require('react-hot-toast')

const errorToast = toast.error
const successToast = toast.success
// const customToast = toast.custom((t) => (
//   <div className='border'>
//     <div className=''>
//       <div className=''></div>
//       <div className=''>
//         <div className=''></div>
//       </div>
//     </div>
//     <div className=''>
//       Migration failed. Reason: An error occurred running
//       'create-migrations-table'. Rolled back this migration. No further
//       migrations were run. Reason: no schema has been selected to create in
//     </div>
//   </div>
// ))
const loadingToast = (content) => {
  toast.loading(content)
}
const removeToast = () => toast.remove(loadingToast())

export { errorToast, successToast, loadingToast, removeToast }
