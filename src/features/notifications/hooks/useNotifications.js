import { useEffect, useState } from 'react'
import { notificationService } from '../services/notificationService'

const useNotifications = () => {
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

  return { notifications, exitingId }
}

export default useNotifications
