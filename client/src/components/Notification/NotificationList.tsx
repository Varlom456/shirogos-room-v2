import { useReadNotification } from '@/api/useReadNotification'
import { IFetchedNotification } from '@/types/notifications.interface'
import { cn } from '@/utils/cn'
import { formatDateNotifications } from '@/utils/formatDate'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface NotificationListProps {
  notifications: IFetchedNotification[]
}

const NotificationList: FC<NotificationListProps> = ({ notifications }) => {
  const { mutate: read } = useReadNotification()

  const readNotification = (notificationId: number) => {
    read(notificationId)
  }

  return (
    <Scrollbar
      noDefaultStyles
      style={{ width: '100%', height: 405 }}
      className='hide-overflow-rounded-corners rounded-b-[2.3125rem] bg-tertiary'
    >
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={cn('relative flex max-h-[5.25rem] min-h-[5.25rem] w-full items-center', {
            'bg-secondaryHover': index % 2 !== 0,
            'bg-tertiary': index % 2 === 0
          })}
        >
          <div
            onClick={() => !notification.isRead && readNotification(notification.id)}
            className={cn(
              'transition-outline group relative -ml-[7px] mr-3 h-[4.875rem] w-[5.125rem] rounded-[0.4375rem] outline outline-2',
              {
                'cursor-pointer outline-[#EBE984]': !notification.isRead,
                'outline-transparent': notification.isRead,
                'bg-secondary': !notification.img
              }
            )}
          >
            {notification.img && (
              <img
                src={`/${notification.img}`}
                alt='notification-img'
                className='h-full w-full rounded-[0.4375rem] object-cover'
              />
            )}

            <div
              className={cn(
                'invisible absolute inset-0 h-full w-full rounded-[0.4375rem] bg-[#EBE984] bg-opacity-40 opacity-0 transition-opacity',
                {
                  'group-hover:visible group-hover:opacity-100': !notification.isRead
                }
              )}
            />
          </div>

          <p className='line-clamp-3 max-w-[15.3125rem] whitespace-break-spaces break-words font-secondary text-xs font-bold text-primaryText'>
            {notification.text}
          </p>

          <p className='absolute bottom-2.5 right-3.5 font-secondary text-[0.625rem] font-bold leading-[7px] text-primary'>
            {formatDateNotifications(notification.date_created)}
          </p>
        </div>
      ))}
    </Scrollbar>
  )
}

export default NotificationList
