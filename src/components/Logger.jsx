import { useEffect, useState } from 'react'
import '../styles/components/logger.style.css'
import notificationService from '../services/notifications.js'

const Logger = () => {
  const [notifications, setNotifications] = useState([])
  const [exitingId, setExitingId] = useState(null)

  useEffect(() => {
    return notificationService.subscribe((notification) => {
      setNotifications(prev => [...prev, notification])
      setExitingId(null)

      setTimeout(() => {
        setExitingId(notification.id)
      }, 4700)

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
        setExitingId(null)
      }, 5000)
    })
  }, [])

  if (notifications.length === 0) return null

  const currentNotification = notifications[notifications.length - 1]
  const isExiting = exitingId === currentNotification.id

  return (
    <div className={`logger ${currentNotification.type} ${isExiting ? 'exiting' : ''}`}>
      {currentNotification.message}
    </div>
  )
}

export default Logger
