import { useAcceptTaskResponse } from '@/api/useAcceptTaskResponse'
import { useRejectTaskResponse } from '@/api/useRejectTaskResponse'
import { IManualTaskResponse } from '@/types/manual-task.interface'
import { FC } from 'react'

interface TaskQueueItemProps {
  response: IManualTaskResponse
  setZoomedImg: React.Dispatch<React.SetStateAction<string | null>>
}

const TaskQueueItem: FC<TaskQueueItemProps> = ({ response, setZoomedImg }) => {
  const { mutate: accept } = useAcceptTaskResponse(response.id)
  const { mutate: reject } = useRejectTaskResponse(response.id)

  return (
    <div className='mb-4 flex h-[7.1875rem] items-center last-of-type:mb-0'>
      <div className='flex h-full w-[35%] max-w-[35%] items-center justify-center'>
        <p className='line-clamp-1 break-words px-2 text-xl text-[#FFF]'>{response.username}</p>
      </div>

      <div className='flex h-full w-[30%] items-center justify-center'>
        {!!response.img ? (
          <img
            src={`/${response.img}`}
            alt='response-screen'
            className='h-[4.625rem] w-[70%] cursor-zoom-in object-contain'
            onClick={() => setZoomedImg(response.img)}
          />
        ) : (
          <div className='flex h-[4.625rem] w-[70%] items-center justify-center bg-primaryText'>
            <p className='text-center leading-none'>скрин не прикреплен</p>
          </div>
        )}
      </div>
      <div className='mr-4 flex h-[4.0625rem] w-[35%]'>
        <button
          onClick={() => accept()}
          className='h-full w-[70%] bg-primary text-[1.875rem] text-[#FFF] transition-all hover:bg-primaryHover'
        >
          ДА
        </button>
        <button
          onClick={() => reject()}
          className='h-full w-[30%] bg-tertiary text-xl text-[#FFF] transition-all hover:bg-opacity-70'
        >
          НЕТ
        </button>
      </div>
    </div>
  )
}

export default TaskQueueItem
