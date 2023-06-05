import { unstable_batchedUpdates } from 'react-dom'

export const throttleRAF = (fn, opts) => {
  let timerId = null
  let lastArgs = null
  let lastArgsTrailing = null

  const scheduleFunc = (args) => {
    timerId = window.requestAnimationFrame(() => {
      timerId = null
      fn(...args)
      lastArgs = null
      if (lastArgsTrailing) {
        lastArgs = lastArgsTrailing
        lastArgsTrailing = null
        scheduleFunc(lastArgs)
      }
    })
  }

  const ret = (...args) => {
    if (process.env.NODE_ENV === 'test') {
      fn(...args)
      return
    }
    lastArgs = args
    if (timerId === null) {
      scheduleFunc(lastArgs)
    } else if (opts?.trailing) {
      lastArgsTrailing = args
    }
  }
  ret.flush = () => {
    if (timerId !== null) {
      cancelAnimationFrame(timerId)
      timerId = null
    }
    if (lastArgs) {
      fn(...(lastArgsTrailing || lastArgs))
      lastArgs = lastArgsTrailing = null
    }
  }
  ret.cancel = () => {
    lastArgs = lastArgsTrailing = null
    if (timerId !== null) {
      cancelAnimationFrame(timerId)
      timerId = null
    }
  }
  return ret
}

export const withBatchedUpdates = (func) => (event) => {
  unstable_batchedUpdates(func, event)
}

export const withBatchedUpdatesThrottled = (func) => {
  // @ts-ignore
  return throttleRAF((event) => {
    unstable_batchedUpdates(func, event)
  })
}

export const distance2d = (x1, y1, x2, y2) => {
  const xd = x2 - x1
  const yd = y2 - y1
  return Math.hypot(xd, yd)
}

export const resolvablePromise = () => {
  let resolve
  let reject
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  promise.resolve = resolve
  promise.reject = reject
  return promise
}
