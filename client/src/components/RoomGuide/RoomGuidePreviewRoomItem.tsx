import { IRoomGuideRandom } from '@/types/room-guide.interface'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ProfileMiniature from '../ProfileMiniature'

interface IRoomGuidePreviewRoomItem {
  room: IRoomGuideRandom
  order?: number
}

const RoomGuidePreviewRoomItem: FC<IRoomGuidePreviewRoomItem> = ({ room, order }) => {
  return (
    <div
      className={
        'room-guide-preview-item mr-[1.3125rem] flex w-[11.5625rem] flex-col items-center last-of-type:mr-0 ' +
        (!!order ? `anim-order-${order}` : '')
      }
    >
      <Link
        className='peer order-3 w-full'
        to={`/guide/${room.user.twitch.login}?from=guidePreview`}
      >
        <ProfileMiniature
          miniature_img={room.user.miniature_img}
          profile_img={room.user.profile_img}
          username={room.user.username}
          frame={room.selected_frame}
          className='aspect-[185/134] w-full cursor-pointer rounded-[2.3125rem] object-cover outline outline-[3px] outline-transparent transition-all hover:outline-primary'
        />
      </Link>

      <p className='order-1 max-w-full truncate px-2 font-secondary text-[0.625rem] font-bold text-[#EBE984] transition-all peer-hover:text-primary'>
        {room.user.username}
      </p>
      <p className='order-2 mb-1 max-h-12 max-w-full overflow-hidden break-all text-center font-secondary text-xs font-bold leading-4 text-primaryText'>
        Комната «{room.name}»
      </p>
    </div>
  )
}

export default RoomGuidePreviewRoomItem
