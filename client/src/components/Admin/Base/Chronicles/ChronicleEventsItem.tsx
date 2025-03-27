import { useDeleteChronicleEvent } from '@/api/useDeleteChronicleEvent'
import { FC } from 'react'

interface IChronicleEventsItem {
  id: number
  chronicleId: number
  day: number
  prefix: string
  text?: string
  img?: string
}

const ChronicleEventsItem: FC<IChronicleEventsItem> = ({
  id,
  chronicleId,
  day,
  prefix,
  text,
  img
}) => {
  const { mutate } = useDeleteChronicleEvent(id, chronicleId)

  const clickDelete = () => {
    mutate()
  }

  return (
    <div className='relative mb-[0.7rem] flex min-h-[2.875rem] w-full items-center last-of-type:mb-0'>
      <div className='flex h-full w-[12%] items-center justify-center'>
        <p className='text-[0.9375rem] text-[#FFF]'>
          {!!prefix && prefix}
          {day}
        </p>
      </div>
      <div className='flex h-full flex-1 items-center justify-center px-2'>
        <p className='text-center text-[0.9375rem] text-[#FFF]'>{text}</p>
      </div>
      <div className='h-[2.875rem] w-[2.875rem] border-[1px] border-[#FFF] bg-primaryText bg-opacity-10'>
        {img && (
          <img
            src={`/${img}`}
            alt='chronicles-img'
            className='h-full w-full'
          />
        )}
      </div>
      <button
        onClick={clickDelete}
        className='h-[2.875rem] px-2 text-[#FFF] transition-all hover:bg-primary'
      >
        -
      </button>
    </div>
  )
}

export default ChronicleEventsItem
