import { FC } from 'react'

interface IChroniclesItem {
  date: string
  day: number
  prefix?: string
  text?: string
  img?: string
}

const ChroniclesItem: FC<IChroniclesItem> = ({ day, prefix, text, img }) => {
  return (
    <div className='mb-[0.9375rem] flex items-center last-of-type:mb-0'>
      <div className='mr-3 flex min-h-[1.5rem] min-w-[3.3125rem] max-w-[3.3125rem] items-center justify-center rounded-[0.4375rem] bg-secondaryHover'>
        <p className='w-full break-words px-1 py-1 text-center font-pressStart text-[0.625rem] text-primaryText'>
          {!!prefix && prefix}
          {day}
        </p>
      </div>

      <div className='flex flex-wrap gap-[0.4375rem]'>
        {text && (
          <p className='max-w-[7.875rem] break-words font-pressStart text-[0.625rem] leading-none text-primaryText'>
            {text}
          </p>
        )}
        {img && (
          <img
            src={`/${img}`}
            className='h-[2.875rem] w-[2.875rem]'
            alt='chronicle-img'
          />
        )}
      </div>
    </div>
  )
}

export default ChroniclesItem
