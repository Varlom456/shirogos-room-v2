import { useChooseActiveRoomFrame } from '@/api/useChooseActiveRoomFrame'
import { IFrame } from '@/types/frame.interface'
import { cn } from '@/utils/cn'
import { FC } from 'react'

interface IFrameItem {
  frame: IFrame
  selectedFrame: number | null
  setSelectedFrame: React.Dispatch<React.SetStateAction<number | null>>
}

const FrameItem: FC<IFrameItem> = ({ frame, selectedFrame, setSelectedFrame }) => {
  const isSelected = frame.id === selectedFrame
  const { mutate } = useChooseActiveRoomFrame()

  const clickFrame = () => {
    if (isSelected) {
      setSelectedFrame(null)
      mutate({ frameId: null })
    } else {
      setSelectedFrame(frame.id)
      mutate({ frameId: frame.id })
    }
  }

  return (
    <button
      className={cn(
        'relative flex h-[7rem] min-w-[6.75rem] max-w-[6.75rem] flex-col items-center py-[0.125rem] transition-opacity hover:opacity-70',
        {
          'z-10': isSelected
        }
      )}
      onClick={clickFrame}
    >
      <img
        src={`/${frame.img}`}
        alt='frame'
        className='aspect-[104/83] h-[4.90625rem]'
      />
      <div className='flex w-full flex-1 items-center justify-center'>
        <p className='line-clamp-1 max-w-full break-words text-[0.8125rem] text-primaryText'>
          {frame.title}
        </p>
      </div>

      <div
        className={cn(
          'absolute top-0 h-[7rem] w-[8.25rem] rounded-[1.125rem] border-2 border-primaryText bg-primaryText bg-opacity-10 transition-all',
          {
            'invisible opacity-0': !isSelected,
            'visible opacity-100': isSelected
          }
        )}
      />
    </button>
  )
}

export default FrameItem
