import type { BadgeType } from '@/types/badge.interface'
import { FC } from 'react'

interface IBadgesNavBttn {
  type: BadgeType
  activeBadgesSection: BadgeType
  setActiveBadgesSection: (activeBadgesSection: BadgeType) => void
}

const BadgesNavBttn: FC<IBadgesNavBttn> = ({
  activeBadgesSection,
  setActiveBadgesSection,
  type
}) => {
  return (
    <button
      onClick={() => setActiveBadgesSection(type)}
      className={
        (activeBadgesSection === type
          ? 'h-[0.5625rem] bg-[#EBE984] '
          : 'h-[0.3125rem] bg-primaryText hover:bg-[#EBE984] ') +
        'mr-[0.125rem] w-[4.875rem] rounded-[0.625rem] transition-all last-of-type:mr-0'
      }
    />
  )
}

export default BadgesNavBttn
