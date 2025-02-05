import { cn } from '@/utils/cn'
import { FC } from 'react'
import RoomGuidePreviewRoomList from './RoomGuidePreviewRoomList'

interface RoomGuidePreviewProps {
  setIsRoomGuideScreenVisible: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

const RoomGuidePreview: FC<RoomGuidePreviewProps> = ({
  setIsRoomGuideScreenVisible,
  className
}) => {
  return (
    <div
      className={cn(
        'flex flex  min-h-[20rem] w-full overflow-hidden rounded-[2.3125rem] bg-secondary',
        className
      )}
    >
      <RoomGuidePreviewRoomList />
      <button
        onClick={() => setIsRoomGuideScreenVisible(true)}
        className='group relative flex h-full w-[7.3125rem] items-center justify-center rounded-br-[2.3125rem] rounded-tr-[2.3125rem] bg-black-to-secondary-gradient transition-all'
      >
        {/* <p className='mr-14 rotate-90 text-center font-secondary text-[1.5625rem] font-bold leading-none text-primaryText transition-all group-hover:text-[#FFF]'>
          ПОЛНЫЙ ПУТЕВОДИТЕЛЬ
        </p> */}
        <div className='absolute  h-0 w-0 border-b-[7rem] border-l-[2rem] border-t-[7rem] border-b-transparent border-l-primary border-t-transparent p-0 transition-all group-hover:border-l-primaryHover' />
      </button>
    </div>
  )
}

export default RoomGuidePreview
