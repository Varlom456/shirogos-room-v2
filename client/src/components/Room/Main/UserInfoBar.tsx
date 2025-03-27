import { FC, useContext, useState } from 'react'
import PastUsernames from './PastUsernames'
import { IPastUsername, IRoomAppearance } from '@/types/room.interface'
import { isUrl } from '@/utils/isUrl'
import noProfilePictureIcon from '@/assets/no-profile-picture-icon.webp'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import LevelBar from './LevelBar'

interface IUserInfoBar {
  profile_img: string | null
  username: string
  past_usernames?: IPastUsername[]
  level: number
  exp: number
  isGuide?: boolean
  guideRoomAppearance?: IRoomAppearance
}

const UserInfoBar: FC<IUserInfoBar> = ({
  profile_img,
  username,
  past_usernames,
  level,
  exp,
  isGuide,
  guideRoomAppearance
}) => {
  const [isPastUsernamesVisible, setIsPastUsernamesVisible] = useState<boolean>(false)
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <div className='relative mb-[0.5625rem] flex h-[24.375rem] flex-col items-center rounded-[1.5625rem] bg-primaryText'>
      <div className='z-30 h-[80%] w-full rounded-t-[1.5625rem] bg-primaryText'>
        {!!profile_img ? (
          <img
            className='h-full w-full rounded-[1.5rem] object-cover'
            src={
              isUrl(profile_img) ? profile_img : `/${profile_img}`
            }
            alt='profile-img'
          />
        ) : (
          <img
            className='h-full w-full rounded-[1.5rem] object-cover'
            src={noProfilePictureIcon}
            alt='profile-img'
          />
        )}
      </div>
      <div className='relative z-20 flex h-[2.4375rem] w-full items-center justify-center rounded-b-[1.5625rem] bg-primaryText'>
        <p
          className={
            (isGuide
              ? `${colorVariants.text[guideRoomAppearance?.active_username_color ?? 'pink']} `
              : `${colorVariants.text[roomAppearance.active_username_color]} `) +
            `max-w-[11.75rem] overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-xl leading-[97.795%]`
          }
        >
          {username}
        </p>
        <button
          onClick={() => setIsPastUsernamesVisible(!isPastUsernamesVisible)}
          className={
            (isPastUsernamesVisible
              ? isGuide
                ? `${colorVariants.border[guideRoomAppearance?.active_room_color ?? 'pink']} `
                : `${colorVariants.border[roomAppearance.active_room_color]} `
              : 'border-t-tertiary ') +
            `border-[0.4375rem] border-t-[0.4375rem] border-b-transparent border-l-transparent border-r-transparent ` +
            (isGuide
              ? `${colorVariantsHover.border[guideRoomAppearance?.active_room_color ?? 'pink']}`
              : `${colorVariantsHover.border[roomAppearance.active_room_color]}`) +
            ` absolute right-[0.56rem] top-6 transition-all hover:border-b-transparent hover:border-l-transparent hover:border-r-transparent`
          }
        />
        <PastUsernames
          isVisible={isPastUsernamesVisible}
          usernames={past_usernames}
          className='right-[0.6rem] top-8'
          isGuide={isGuide}
          guideRoomAppearance={guideRoomAppearance}
        />
      </div>
      <LevelBar level={level} exp={exp} />
    </div>
  )
}

export default UserInfoBar
