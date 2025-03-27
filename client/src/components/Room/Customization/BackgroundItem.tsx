import { useChooseActiveRoomBackground } from '@/api/useChooseActiveRoomBackground'
import { FC } from 'react'

interface IBackgroundItem {
  id: number
  img: string
  title: string
  selectedBg: number | null
  setSelectedBg: React.Dispatch<React.SetStateAction<number | null>>
}

const BackgroundItem: FC<IBackgroundItem> = ({ id, img, title, selectedBg, setSelectedBg }) => {
  const { mutate } = useChooseActiveRoomBackground()

  const clickBg = () => {
    if (selectedBg === id) {
      setSelectedBg(null)
      mutate({ backgroundId: null })
    } else {
      setSelectedBg(id)
      mutate({ backgroundId: id })
    }
  }

  return (
    <div
      key={id}
      onClick={clickBg}
      className={
        (selectedBg === id ? 'scale-105 ' : '') +
        'relative mb-2 mr-5 flex cursor-pointer flex-col items-center transition-all duration-300'
      }
    >
      <img
        className={
          (selectedBg === id ? 'border-2 border-[#F8FEFA] ' : '') +
          'pointer-events-none mb-2 max-h-[11rem] min-w-[18.375rem] rounded-[1.5625rem] object-cover'
        }
        src={`/${img}`}
        alt='bg-img'
      />
      <p
        className={
          (selectedBg === id ? '-bottom-6 text-xl ' : '-bottom-4 text-[0.8125rem] ') +
          'absolute select-none text-center text-primaryText transition-all'
        }
      >
        {title ?? 'Нет названия'}
      </p>
    </div>
  )
}

export default BackgroundItem
