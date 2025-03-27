import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import type { DangotekaItemType } from '@/pages/Dangoteka'

interface IDangotekaSectionItem {
  type: DangotekaItemType
  itemId: string
  img: string
  title: string
  description: string | null
}

const DangotekaSectionItem: FC<IDangotekaSectionItem> = ({
  type,
  itemId,
  img,
  title,
  description
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div onMouseLeave={() => setIsHovered(false)} className='relative h-[24.25rem] w-[32.25rem]'>
      <div
        className={cn(
          'absolute left-0 top-0 flex items-center transition-all duration-500 ease-dangoteka',
          {
            'left-[7.375rem] duration-1000': isHovered,
            '-top-[1.0625rem]': isHovered && type === 'manga',
            '-top-[0.4375rem]': isHovered && type === 'story'
          }
        )}
      >
        <Link
          onMouseEnter={() => setIsHovered(true)}
          className={cn(
            'z-10 inline-block h-[19.4375rem] w-[14.75rem] transition-all duration-500 ease-dangoteka',
            {
              'h-[23.8125rem] w-[18.0625rem] duration-1000': isHovered
            }
          )}
          to={type === 'manga' ? '/manga/' + itemId + '/1' : '/story/' + itemId}
        >
          <img
            className='h-full w-full rounded-[2.3125rem] object-cover'
            src={`/${img}`}
            alt='manga-img'
          />
        </Link>
        <div
          className={cn(
            'absolute left-[16.5625rem] top-0 flex h-full w-[15.6875rem] items-center justify-center transition-all duration-500 ease-dangoteka',
            {
              'left-0 duration-1000': isHovered
            }
          )}
        >
          <p className='line-clamp-[13] break-words text-center text-[0.9375rem] text-primaryText '>
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          'absolute bottom-4 left-0 flex h-14 w-[14.75rem] items-center justify-center transition-all duration-500 ease-dangoteka',
          {
            'bottom-16 left-[7.375rem] duration-1000': isHovered
          }
        )}
      >
        <h3 className='line-clamp-2 break-words text-center text-xl text-primaryText'>{title}</h3>
      </div>
    </div>
  )
}

export default DangotekaSectionItem
