import { FC, useContext } from 'react'
import { formatDate } from '@/utils/formatDate'
import { Scrollbar } from 'react-scrollbars-custom'
import { IRoomAppearance } from '@/types/room.interface'
import { RoomAppearanceContext } from '@/Context'
import { useAchievementsByTwitchLogin } from '@/api/useAchievementsByTwitchLogin'

interface IUserAchievementsBar {
  created_at: Date
  twitchLogin: string
  isGuide?: boolean
  guideRoomAppearance?: IRoomAppearance
}

const UserAchievementsBar: FC<IUserAchievementsBar> = ({
  created_at,
  twitchLogin,
  isGuide,
  guideRoomAppearance
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const { data: achievements } = useAchievementsByTwitchLogin(twitchLogin)

  return (
    <div className='flex min-h-[40.625rem] flex-1 flex-col justify-end rounded-b-[1.5625rem] bg-tertiary'>
      <div className='flex h-[1.875rem] w-full items-center justify-center'>
        <p className='text-center text-xl leading-[97.795%] text-primaryText'>Достижения</p>
      </div>
      <div className='relative flex h-[38.75rem] w-full flex-col items-center justify-end rounded-[1.5625rem] bg-secondaryHover'>
        <Scrollbar
          noDefaultStyles
          style={{ width: '100%', height: '100%' }}
          className={
            (isGuide
              ? `${guideRoomAppearance?.active_room_color}-scrollbar`
              : `${roomAppearance.active_room_color}-scrollbar`) + ' my-[0.3125rem]'
          }
        >
          <div className='flex flex-col items-center'>
            {achievements?.map((achievement) => (
              <div
                key={achievement.id}
                className='relative z-0 mb-[0.3125rem] flex aspect-[213/30] w-[91%] items-center justify-center rounded-[1.5625rem] bg-black last-of-type:mb-0'
              >
                <img
                  src={`/${achievement.background}`}
                  className='pointer-events-none absolute h-full w-full select-none rounded-[1.5625rem] opacity-50'
                />
                <p className='z-10 line-clamp-1 max-h-full max-w-full overflow-hidden break-words px-4 text-center text-[0.9375rem] text-primaryText'>
                  {achievement.title}
                </p>
              </div>
            ))}
          </div>
        </Scrollbar>
        <p className='absolute -bottom-2 translate-y-[100%] text-center text-[0.625rem] leading-[97.795%] text-primaryText'>
          {' '}
          участник с {formatDate(created_at)}
        </p>
      </div>
    </div>
  )
}

export default UserAchievementsBar
