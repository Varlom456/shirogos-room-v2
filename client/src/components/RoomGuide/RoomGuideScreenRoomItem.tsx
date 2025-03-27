import { IRoomGuideByLevel } from '@/types/room-guide.interface'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ProfileMiniature from '../ProfileMiniature'

interface IRoomGuideScreenRoomItem {
  index: number
  room: IRoomGuideByLevel
}

const RoomGuideScreenRoomItem: FC<IRoomGuideScreenRoomItem> = ({ index, room }) => {
  return (
    <div className='flex w-full h-full items-center justify-between'>
      <p className='z-40 min-w-[8.2%] max-w-[8.2%] break-words text-right text-[3.125rem] leading-[97.8%] text-primaryText'>
        #{index}
      </p>
      <Link
        className='h-full w-[90.5%] min-w-[90.5%]'
        to={`/guide/${room.user.twitch.login}?from=guideScreen`}
      >
        <div className='group relative flex h-full min-w-full max-w-full cursor-pointer items-center justify-between'>
          <ProfileMiniature
            miniature_img={room.user.miniature_img}
            profile_img={room.user.profile_img}
            username={room.user.username}
            frame={room.selected_frame}
            containerClassName='h-full'
            className='z-10 aspect-[290/236] h-full rounded-[2.3125rem] object-cover'
          />
          <div className='z-10 flex h-full flex-1 items-center justify-between overflow-hidden px-[2.6%]'>
            <div className='min-w-[61.75%] max-w-[61.75%]'>
              <p className='max-w-full overflow-hidden break-words font-secondary text-2xl font-bold text-primaryText laptop:text-[2.8125rem] laptop:leading-[60px]'>
                Комната «{room.name}»
              </p>
            </div>

            <div className='flex min-w-[30%] max-w-[30%] flex-col items-center'>
              <p className='max-h-[90px] max-w-full overflow-hidden break-words text-center font-secondary text-xl font-bold text-[#EBE984] laptop:text-[2.1875rem] laptop:leading-[45px]'>
                {room.user.username}
              </p>
              <p className='max-w-full text-center font-secondary text-xl font-bold text-primaryText laptop:text-[2.1875rem] laptop:leading-none'>
                {room.user.level} уровень
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: !!room.selected_background
                ? `url(/${room.selected_background?.img})`
                : "url('/images/room-default-bg.webp')"
            }}
            className='absolute right-0 h-full w-full rounded-[2.3125rem] bg-cover bg-center bg-no-repeat opacity-20 transition-all group-hover:opacity-50'
          />
        </div>
      </Link>
    </div>
  )
}

export default RoomGuideScreenRoomItem
