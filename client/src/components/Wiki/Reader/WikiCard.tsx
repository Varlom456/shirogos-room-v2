import { FC } from 'react'

interface IWikiCard {
  name: string
  img: string | null
  subtitle: string | null
  subsubtitle: string | null
  isSidebarOpen: boolean
}

const WikiCard: FC<IWikiCard> = ({ name, img, subtitle, subsubtitle, isSidebarOpen }) => {
  return (
    <div className='z-30 flex flex-col items-end'>
      <div className='mb-3 flex min-h-[3.75rem] w-[24.8125rem] items-center justify-center bg-primary bg-opacity-80'>
        <p className='px-2 text-center font-secondary text-[2.1875rem] font-bold text-primaryText'>
          {name}
        </p>
      </div>
      <div
        className={
          (isSidebarOpen
            ? 'before:opacity-0 after:opacity-100'
            : 'before:opacity-100 after:opacity-0') +
          ' relative z-20 mb-[0.93rem] rounded-[2.3125rem] p-[1px] transition-all duration-1000 ease-out before:absolute before:inset-0 before:-z-10 before:block before:h-full before:w-full before:rounded-[2.3125rem] before:bg-wiki-character-gradient before:transition-all before:content-[""] before:duration-1000 before:ease-out after:absolute after:inset-0 after:-z-10 after:block after:h-full after:w-full after:rounded-[2.3125rem] after:bg-wiki-character-gradient-second after:transition-all after:content-[""] after:duration-1000 after:ease-out'
        }
      >
        {!!img ? (
          <img
            className='w-[22.5rem] rounded-[2.3125rem]'
            src={`/${img}`}
            alt={`${name}-img`}
          />
        ) : (
          <div className='h-[30rem] w-[22.5rem] rounded-[2.3125rem] bg-tertiary' />
        )}
      </div>

      <div className='mb-3 flex h-[2.625rem] w-[24.8125rem] items-center justify-center bg-tertiary bg-opacity-80'>
        <p className='truncate px-2 text-center font-secondary text-[1.5625rem] font-bold text-primaryText'>
          {subsubtitle ?? '???'}
        </p>
      </div>
      <div className='flex h-[3.25rem] w-[28.1875rem] items-center justify-center bg-tertiary bg-opacity-80'>
        <p className='truncate px-2 text-center font-secondary text-[1.5625rem] font-bold text-primaryText'>
          {subtitle ?? '???'}
        </p>
      </div>
    </div>
  )
}

export default WikiCard
