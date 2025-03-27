import { FC } from 'react'
import RoomGuidePreviewRoomList from './RoomGuidePreviewRoomList'
import { cn } from '@/utils/cn'

interface RoomGuidePreviewProps {
  setIsRoomGuideScreenVisible: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

const RoomGuidePreview: FC<RoomGuidePreviewProps> = ({
  setIsRoomGuideScreenVisible,
  className
}) => {
  return (
    <div className={cn('flex h-[26.0625rem] w-full rounded-[2.3125rem]', className)}>
      <RoomGuidePreviewRoomList />
      <button
        onClick={() => setIsRoomGuideScreenVisible(true)}
        className='group relative flex h-full w-[10.3125rem] items-center justify-center rounded-br-[2.3125rem] rounded-tr-[2.3125rem] bg-black-to-secondary-gradient transition-all'
      >
        <p className='mr-14 rotate-90 text-center font-secondary text-[1.5625rem] font-bold leading-none text-primaryText transition-all group-hover:text-[#FFF]'>
          ПОЛНЫЙ ПУТЕВОДИТЕЛЬ
        </p>
        <div className='absolute right-[2.1875rem] h-0 w-0 border-b-[7rem] border-l-[2rem] border-t-[7rem] border-b-transparent border-l-primary border-t-transparent transition-all group-hover:border-l-primaryHover' />
      </button>
    </div>
  )
}

export default RoomGuidePreview
