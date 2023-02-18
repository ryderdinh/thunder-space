export default class RFDate {
  constructor(value) {
    const date = !value ? new Date() : new Date(value)

    this.date = date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    this.time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

// export const date = {
//   formatDate: (d) => {
//     const date = new Date(d)
//     return date.toLocaleDateString('vi-VN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     })
//   },
//   formatTime: (t) => {
//     const date = new Date(t)
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }
// }
