let listeners = []
let notificationId = 0

const loggerService = {
  subscribe: (callback) => {
    listeners.push(callback)
    return () => {
      listeners = listeners.filter(l => l !== callback)
    }
  },

  notify: (message, type) => {
    const id = ++notificationId
    listeners.forEach(listener => listener({ id, message, type }))
  },

  success: (message) => {
    loggerService.notify(message, 'success')
  },

  error: (message) => {
    loggerService.notify(message, 'error')
  }
}

export default loggerService
