import { useRandomRooms } from '@/api/useRandomRooms'
import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import RoomGuidePreviewRoomItem from './RoomGuidePreviewRoomItem'

const RoomGuidePreviewRoomList: FC = () => {
  const { data: rooms, isLoading, isError } = useRandomRooms()
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true
  })

  return isLoading ? (
    <div className='flex h-full flex-1 items-center justify-center rounded-bl-[2.3125rem] rounded-tl-[2.3125rem] bg-secondary bg-opacity-90'>
      <p className='text-primaryText'>Загрузка...</p>
    </div>
  ) : isError ? (
    <div className='flex h-full flex-1 items-center justify-center rounded-bl-[2.3125rem] rounded-tl-[2.3125rem] bg-secondary bg-opacity-90'>
      <p className='text-primaryText'>Произошла ошибка</p>
    </div>
  ) : (
    <div
      ref={ref}
      className={
        'room-guide-preview-list relative flex h-full flex-1  p-1' + (inView ? 'inView' : '')
      }
      style={{ padding: '1em' }}
    >
      <div className='grid h-full w-full grid-cols-4 gap-x-4 gap-y-8'>
        {rooms.map(
          (room, index) =>
            room && (
              <div
                key={room.id}
                className='flex  w-full items-center justify-center bg-secondary bg-opacity-90'
              >
                <RoomGuidePreviewRoomItem room={room} order={index + 1} />
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default RoomGuidePreviewRoomList
