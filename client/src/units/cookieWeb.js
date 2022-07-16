import Cookies from 'js-cookie'

const config = { expires: 1 / 24 }

const getCookie = () => {
  return Cookies.get('thunder-space-cookie')
    ? JSON.parse(Cookies.get('thunder-space-cookie'))
    : {}
}

const setCookie = (data) => {
  const result = Cookies.get('thunder-space-cookie')

  let newCookie = typeof result == 'object' ? JSON.parse(result) : {}

  data.forEach((item) => {
    newCookie[item.key] = item.value
  })

  Cookies.set('thunder-space-cookie', JSON.stringify(newCookie), config)
}

const removeCookie = (type, key) => {
  if (type === 'all') {
    Cookies.remove('thunder-space-cookie')
  } else {
    const result = Cookies.get('thunder-space-cookie')

    let newCookie = JSON.parse(result)
    delete newCookie[key]

    Cookies.set('thunder-space-cookie', JSON.stringify(newCookie), config)
  }
}

export { getCookie, setCookie, removeCookie }
