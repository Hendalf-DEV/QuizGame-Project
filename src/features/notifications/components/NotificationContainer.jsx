import useNotifications from '../hooks/useNotifications'
import '../../../styles/components/loggerComponentStyle.css'

const NotificationContainer = () => {
  const { notifications, exitingId } = useNotifications()

  if (notifications.length === 0) return null

  const currentNotification = notifications[notifications.length - 1]
  const isExiting = exitingId === currentNotification.id

  return (
    <div className={`logger ${currentNotification.type} ${isExiting ? 'exiting' : ''}`}>
      {currentNotification.message}
    </div>
  )
}

export default NotificationContainer
