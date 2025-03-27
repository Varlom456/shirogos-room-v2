import { FC, useContext } from 'react'
import { IEditorBadge } from '../Sections/RoomEditor'
import { RoomAppearanceContext } from '@/Context'
import { colorVariantsGroupHover } from '@/consts/roomColors'

interface IBadgeItem {
  id: number
  title: string
  img: string
  setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
  zIndexCount: number
  setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const BadgeItem: FC<IBadgeItem> = ({
  id,
  title,
  img,
  setEditorBadges,
  zIndexCount,
  setZIndexCount
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const clickHandler = () => {
    setEditorBadges((prev) =>
      prev.length > 0
        ? [
            ...prev,
            {
              badge_id: id,
              badgeImg: img,
              zIndex: zIndexCount
            }
          ]
        : [
            {
              badge_id: id,
              badgeImg: img,
              zIndex: zIndexCount
            }
          ]
    )

    setZIndexCount((prev) => prev + 1)
  }

  return (
    <div
      key={id}
      className='group mr-[0.5625rem] flex h-full min-w-[7rem] max-w-[7rem] cursor-pointer flex-col items-center transition-all last-of-type:mr-0'
      onClick={clickHandler}
    >
      <div className='mb-2 flex h-[7rem] items-center justify-center'>
        <img src={`/${img}`} alt={title} />
      </div>

      <p
        className={`max-h-[2.7rem] max-w-full overflow-hidden text-ellipsis px-3 text-center text-[0.8125rem] leading-[0.9rem] text-primaryText ${
          colorVariantsGroupHover.text[roomAppearance.active_room_color]
        } transition-all`}
      >
        {title}
      </p>
    </div>
  )
}

export default BadgeItem
