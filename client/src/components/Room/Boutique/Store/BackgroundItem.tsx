import { IBackground } from '@/types/background.interface'
import { FC } from 'react'

interface IBackgroundItem {
  background: IBackground
  buyedBackgrounds: IBackground[]
  activeBg: IBackground | null
  setActiveBg: React.Dispatch<React.SetStateAction<IBackground | null>>
}

const BackgroundItem: FC<IBackgroundItem> = ({
  background,
  buyedBackgrounds,
  activeBg,
  setActiveBg
}) => {
  const isBuyed = buyedBackgrounds.some((bg) => bg.id === background.id)

  return (
    <div
      key={background.id}
      onClick={() => (activeBg?.id === background.id ? setActiveBg(null) : setActiveBg(background))}
      className={
        (background.id === activeBg?.id ? 'bg-tertiary bg-opacity-[0.35] ' : '') +
        'mb-10 flex w-[69%] max-w-[38.4375rem] cursor-pointer flex-col items-center rounded-[1.25rem] pb-5 pt-[0.69rem] transition-all last-of-type:mb-0 hover:bg-tertiary hover:bg-opacity-[0.35]'
      }
    >
      <img
        className='mb-5 w-[88%] rounded-[1.5625rem]'
        src={`/${background.img}`}
        alt='bg-img'
      />
      <p className='w-[88%] text-center text-[1.5625rem] leading-[100%] text-primaryText'>
        {background.title ?? 'Без названия'} -{' '}
        <span className='text-[#EBE984]'>{!!isBuyed ? 'Куплено' : `${background.cost} ДО`}</span>
      </p>
    </div>
  )
}

export default BackgroundItem
