import { cn } from '@/utils/cn'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface WikiCharacterItemProps {
  id: string
  name: string
  img: string | null
  inCategory?: boolean
}

const WikiCharacterItem: FC<WikiCharacterItemProps> = ({ id, name, img, inCategory = false }) => {
  const [isItemHovered, setIsItemHovered] = useState<boolean>(false)

  return (
    <Link
      to={`/wiki/${id}`}
      onMouseOver={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
      className={cn('relative flex cursor-pointer flex-col items-center justify-self-center', {
        'w-[11.1875rem]': !inCategory,
        'w-[8.5625rem]': inCategory
      })}
    >
      {!!img ? (
        <img
          className={cn(
            'aspect-[179/240] w-full rounded-[1.25rem] border-2 border-primaryText object-cover transition-all',
            {
              'scale-110': isItemHovered && !inCategory
            }
          )}
          src={`/${img}`}
          alt='character-img'
        />
      ) : (
        <div
          className={cn(
            'aspect-[179/240] w-full rounded-[1.25rem] border-2 border-primaryText bg-tertiary transition-all',
            {
              'scale-110': isItemHovered && !inCategory
            }
          )}
        />
      )}

      <div className='flex h-[3.125rem] w-full items-center justify-center'>
        <p
          className={cn(
            'line-clamp-2 w-full break-words text-center text-base leading-5 transition-all',
            {
              'translate-y-[0.715625rem] text-primary': isItemHovered && !inCategory,
              'text-primary ': isItemHovered && inCategory,
              'text-primaryText': !isItemHovered
            }
          )}
        >
          {name}
        </p>
      </div>
    </Link>
  )
}

export default WikiCharacterItem
