let listeners = []
let notificationId = 0

const notificationService = {
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
    notificationService.notify(message, 'success')
  },

  error: (message) => {
    notificationService.notify(message, 'error')
  }
}

export default notificationService
