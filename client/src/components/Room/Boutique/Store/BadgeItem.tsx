import { IBadge } from '@/types/badge.interface'
import { FC } from 'react'

interface IBadgeItem {
  badge: IBadge
  buyedBadges: IBadge[]
  activeBadge: IBadge | null
  setActiveBadge: React.Dispatch<React.SetStateAction<IBadge | null>>
}

const BadgeItem: FC<IBadgeItem> = ({ badge, buyedBadges, activeBadge, setActiveBadge }) => {
  const isBuyed = buyedBadges.find((buyedBadge) => buyedBadge.id === badge.id)

  return (
    <div
      key={badge.id}
      onClick={() => (activeBadge === badge ? setActiveBadge(null) : setActiveBadge(badge))}
      className={
        (badge.id === activeBadge?.id ? 'bg-tertiary bg-opacity-[0.35] ' : '') +
        'mb-[0.63rem] flex max-h-[7rem] min-h-[7rem] cursor-pointer items-center justify-between rounded-[1.6875rem] transition-all last-of-type:mb-0 hover:bg-tertiary hover:bg-opacity-[0.35]'
      }
    >
      <div className='mr-[0.62rem] flex max-h-[7rem] min-h-[7rem] w-1/2 items-center justify-center'>
        <img
          src={`/${badge.img}`}
          alt='badge-img'
          className='max-h-[7rem] min-h-[7rem] object-contain'
        />
      </div>

      <div className='flex max-h-[7rem] min-h-[7rem] flex-1 flex-col items-center justify-center overflow-hidden overflow-y-auto'>
        <p className='px-2 text-center text-[0.8125rem] leading-[100%] text-primaryText'>
          {badge.title}
        </p>
        <p className='text-center text-[0.8125rem] leading-[100%] text-[#EBE984]'>
          {!!isBuyed ? 'Куплено' : `${badge.cost} ДО`}
        </p>
      </div>
    </div>
  )
}

export default BadgeItem
