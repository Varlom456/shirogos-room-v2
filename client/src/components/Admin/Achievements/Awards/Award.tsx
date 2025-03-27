import { useUniqueBackgrounds } from '@/api/useUniqueBackgrounds'
import { useUniqueBadges } from '@/api/useUniqueBadges'
import { useUniqueFrames } from '@/api/useUniqueFrames'
import { useUniquePanopticons } from '@/api/useUniquePanopticons'
import { AwardType } from '@/types/achievements.interface'
import { FC } from 'react'

interface IAward {
  selectedAwardType: AwardType | null
  awardType: AwardType
  award: number | null
  setAward: React.Dispatch<React.SetStateAction<number | null>>
  isNew: boolean
}

const Award: FC<IAward> = ({ selectedAwardType, awardType, award, setAward, isNew }) => {
  let query, items, isLoading, isError

  if (awardType === 'badge') {
    query = useUniqueBadges()
    items = query.data
    isLoading = query.isLoading
    isError = query.isError
  } else if (awardType === 'frame') {
    query = useUniqueFrames()
    items = query.data
    isLoading = query.isLoading
    isError = query.isError
  } else if (awardType === 'background') {
    query = useUniqueBackgrounds()
    items = query.data
    isLoading = query.isLoading
    isError = query.isError
  } else if (awardType === 'panopticon') {
    query = useUniquePanopticons()
    items = query.data
    isLoading = query.isLoading
    isError = query.isError
  } else return <></>

  return (
    <div
      className={
        (selectedAwardType === awardType ? 'block ' : 'hidden ') +
        'relative flex w-full flex-1 flex-col items-center overflow-y-auto transition-all ' +
        (!isNew ? 'flex-row justify-center' : '')
      }
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-[#FFF]'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-[#FFF]'>Ошибка</p>
        </div>
      ) : items && !items.length ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Нет данных</p>
        </div>
      ) : isNew ? (
        items?.map((item) => (
          <button
            key={item.id}
            onClick={() => (award === item.id ? setAward(null) : setAward(item.id))}
            disabled={!isNew}
            className={
              'flex  w-full items-center justify-between px-4 py-4 transition-all ' +
              (award === item.id ? 'bg-secondary' : 'bg-tertiary') +
              (isNew ? ' cursor-pointer hover:bg-secondary' : 'cursor-default')
            }
          >
            <div className='mr-2 flex max-h-[80%] min-w-[50%] max-w-[50%] items-center justify-center'>
              <img className='max-h-12' src={`/${item.img}`} />
            </div>
            <p className='max-h-12 flex-1 overflow-y-auto text-center text-xs text-[#FFF]'>
              {item.title}
            </p>
          </button>
        ))
      ) : (
        items
          ?.filter((item) => item.id === award)
          .map((item) => (
            <button
              key={item.id}
              onClick={() => (award === item.id ? setAward(null) : setAward(item.id))}
              disabled={!isNew}
              className={
                'flex  w-full items-center justify-between px-4 py-4 transition-all ' +
                (award === item.id ? 'bg-secondary' : 'bg-tertiary') +
                (isNew ? ' cursor-pointer hover:bg-secondary' : 'cursor-default')
              }
            >
              <div className='mr-2 flex max-h-[80%] min-w-[50%] max-w-[50%] items-center justify-center'>
                <img className='max-h-12' src={`/${item.img}`} />
              </div>
              <p className='max-h-12 flex-1 overflow-y-auto text-center text-xs text-[#FFF]'>
                {item.title}
              </p>
            </button>
          ))
      )}
    </div>
  )
}

export default Award
