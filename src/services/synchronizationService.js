let listeners = []
let channel = null

const tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

if (typeof BroadcastChannel !== 'undefined') {
  channel = new BroadcastChannel('sync_channel')
  channel.onmessage = (event) => {
    if (event.data.tabId === tabId) return
    listeners.forEach(listener => listener(event.data))
  }
}

window.addEventListener('storage', (event) => {
  if (event.key === 'sync_event' && event.newValue) {
    try {
      const data = JSON.parse(event.newValue)
      if (data.tabId === tabId) return
      listeners.forEach(listener => listener(data))
    } catch (error) {
      console.error('Failed to parse sync event:', error)
    }
  }
})

const syncService = {
  subscribe: (callback) => {
    listeners.push(callback)
    return () => {
      listeners = listeners.filter(l => l !== callback)
    }
  },

  broadcast: (type, data) => {
    const message = { type, data, timestamp: Date.now(), tabId }

    if (channel) {
      channel.postMessage(message)
    } else {
      localStorage.setItem('sync_event', JSON.stringify(message))
      setTimeout(() => {
        localStorage.removeItem('sync_event')
      }, 100)
    }
  },

  userLoggedOut: () => {
    syncService.broadcast('USER_LOGGED_OUT', null)
  },

  userLoggedIn: (user) => {
    syncService.broadcast('USER_LOGGED_IN', user)
  }
}

export default syncService

