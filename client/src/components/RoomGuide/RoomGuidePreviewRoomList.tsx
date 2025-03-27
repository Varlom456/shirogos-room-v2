import { useRandomRooms } from '@/api/useRandomRooms'
import { FC } from 'react'
import RoomGuidePreviewRoomItem from './RoomGuidePreviewRoomItem'
import { useInView } from 'react-intersection-observer'

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
      className={'room-guide-preview-list relative flex h-full flex-1 ' + (inView ? 'inView' : '')}
    >
      <div className='h-full w-[2.4375rem] rounded-l-[2.3125rem] bg-secondary bg-opacity-90'>
        <div className='h-full w-full rounded-l-[2.3125rem] bg-tertiary bg-opacity-40' />
      </div>

      <div className='flex h-full flex-1 flex-col justify-between'>
        <div className='h-[12.5rem] w-full bg-secondary bg-opacity-90'>
          <div className='flex h-full w-full items-center bg-tertiary bg-opacity-40 pl-[0.5rem] pr-[2.5625rem]'>
            {rooms[0] && <RoomGuidePreviewRoomItem room={rooms[0]} order={1} />}
            {rooms[2] && <RoomGuidePreviewRoomItem room={rooms[2]} order={3} />}
            {rooms[4] && <RoomGuidePreviewRoomItem room={rooms[4]} order={5} />}
            {rooms[6] && <RoomGuidePreviewRoomItem room={rooms[6]} order={7} />}
          </div>
        </div>

        <div className='h-[12.5rem] w-full bg-secondary bg-opacity-90'>
          <div className='flex h-full w-full items-center bg-tertiary bg-opacity-40 pl-[0.5rem] pr-[2.5625rem]'>
            {rooms[1] && <RoomGuidePreviewRoomItem room={rooms[1]} order={2} />}
            {rooms[3] && <RoomGuidePreviewRoomItem room={rooms[3]} order={4} />}
            {rooms[5] && <RoomGuidePreviewRoomItem room={rooms[5]} order={6} />}
            {rooms[7] && <RoomGuidePreviewRoomItem room={rooms[7]} order={8} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomGuidePreviewRoomList
