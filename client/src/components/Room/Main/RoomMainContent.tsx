import { FC, useContext } from 'react'
import UserBar from './UserBar'
import Statistic from '../Editor/Widgets/Statistic'
import UniqueRole from '../Editor/Widgets/UniqueRole'
import Notepad from '../Editor/Widgets/Notepad'
import FavioriteCharacter from '../Editor/Widgets/FavioriteCharacter'
import { IRoom, IRoomAppearance, IRoomEditor } from '@/types/room.interface'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { IRoomGuideWidgetInfo } from '@/types/room-guide.interface'
import { Link } from 'react-router-dom'

interface IRoomMainContent {
  room: IRoom
  editor: IRoomEditor
  isGuide?: boolean
  widgetsInfo?: IRoomGuideWidgetInfo
  guideRoomAppearance?: IRoomAppearance
  fromSection?: 'screen' | 'preview' | null
}

const RoomMainContent: FC<IRoomMainContent> = ({
  room,
  editor,
  isGuide = false,
  widgetsInfo,
  guideRoomAppearance,
  fromSection
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <>
      <div className='mr-[1.38rem] flex-1'>
        <div className='relative mb-[1.125rem] flex h-[4.875rem] w-full flex-col items-center justify-center rounded-[2.3125rem] bg-tertiary'>
          {isGuide && (
            <Link
              to={
                fromSection === 'screen'
                  ? '/?to=guideScreen'
                  : fromSection === 'preview'
                  ? '/?to=guidePreview'
                  : '/'
              }
              className={`h-[5.625rem] w-[5.375rem] ${
                colorVariants.bg[guideRoomAppearance?.active_room_color ?? 'pink']
              } ${
                colorVariantsHover.bg[guideRoomAppearance?.active_room_color ?? 'pink']
              } absolute -left-[1.3125rem] flex -translate-x-[100%] items-center justify-center rounded-[2.3125rem] pb-3 pr-[0.3125rem] text-[5rem] text-[#FFF] transition-all`}
            >{`<`}</Link>
          )}
          <p className='text-xl leading-[97.795%] text-primaryText'>Комната</p>
          <p className='text-center text-[1.875rem] leading-[97.795%] text-primaryText'>
            {room.name}
          </p>
        </div>
        <div className='relative aspect-[1163/953] w-full rounded-[2.3125rem] bg-black bg-opacity-25'>
          {!!editor && (
            <>
              {editor.badges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    width: `${badge.width}%`,
                    height: `${badge.height}%`,
                    transform: `translate(${badge.translateX}%, ${badge.translateY}%)`,
                    zIndex: badge.zIndex
                  }}
                  className='absolute flex items-center justify-center'
                >
                  <img
                    key={badge.id}
                    src={`/${badge.badge.img}`}
                    alt=''
                    className='h-full'
                  />
                </div>
              ))}

              {editor.widgets
                .filter((widget) => widget.widgetType === 'FAVORITE_CHARACTER')
                .map((widget) => (
                  <div
                    key={widget.widgetType}
                    style={{
                      transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
                      zIndex: widget.zIndex
                    }}
                    className={
                      `absolute flex aspect-[199/361] w-[17.11%] justify-center rounded-[1.5625rem] ` +
                      (isGuide
                        ? `${
                            colorVariants.bgRoomGradient[
                              guideRoomAppearance?.active_room_color ?? 'pink'
                            ]
                          }`
                        : `${colorVariants.bgRoomGradient[roomAppearance.active_room_color]}`)
                    }
                  >
                    <FavioriteCharacter
                      isGuide={isGuide}
                      guideFavoriteCharacter={widgetsInfo?.favorite_character}
                    />
                  </div>
                ))}

              {editor.widgets
                .filter((widget) => widget.widgetType === 'NOTEPAD')
                .map((widget) => (
                  <div
                    key={widget.widgetType}
                    style={{
                      transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
                      zIndex: widget.zIndex
                    }}
                    className='absolute aspect-[239/292.37] w-[20.55%]'
                  >
                    <Notepad notepadText={editor.notepad_text} isDisabled />
                  </div>
                ))}

              {editor.widgets
                .filter((widget) => widget.widgetType === 'UNIQUE_ROLE')
                .map((widget) => (
                  <div
                    key={widget.widgetType}
                    style={{
                      transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
                      zIndex: widget.zIndex
                    }}
                    className='absolute aspect-[287/138.81] w-[24.68%]'
                  >
                    <UniqueRole isGuide={isGuide} guideUniqueRoles={widgetsInfo?.unique_role} />
                  </div>
                ))}

              {editor.widgets
                .filter((widget) => widget.widgetType === 'STATISTIC')
                .map((widget) => (
                  <div
                    key={widget.widgetType}
                    style={{
                      transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
                      zIndex: widget.zIndex
                    }}
                    className={
                      `absolute aspect-[452/313] w-[38.865%] rounded-[1.5625rem] ` +
                      (isGuide
                        ? `${
                            colorVariants.bgRoomGradient[
                              guideRoomAppearance?.active_room_color ?? 'pink'
                            ]
                          }`
                        : `${colorVariants.bgRoomGradient[roomAppearance.active_room_color]}`)
                    }
                  >
                    <Statistic isGuide={isGuide} guideStats={widgetsInfo?.stats} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <UserBar
        profile_img={room.user.profile_img}
        username={room.user.username}
        twitchLogin={room.user.twitch.login}
        created_at={room.created_at}
        level={room.user.level}
        exp={room.user.exp}
        past_usernames={room.user.past_usernames}
        isGuide={isGuide}
        guideRoomAppearance={guideRoomAppearance}
      />
    </>
  )
}

export default RoomMainContent
