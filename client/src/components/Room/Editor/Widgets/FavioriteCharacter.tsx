import { useFavoriteCharacter } from '@/api/useFavoriteCharacter'
import { IFavoriteCharacter } from '@/types/room.interface'
import { FC } from 'react'

interface IFavioriteCharacter {
  isGuide?: boolean
  guideFavoriteCharacter?: IFavoriteCharacter
}

const FavioriteCharacter: FC<IFavioriteCharacter> = ({ isGuide, guideFavoriteCharacter }) => {
  const { data: favoriteCharacter, isLoading, isError } = useFavoriteCharacter(!isGuide)

  return (
    <>
      {isLoading && !isGuide ? (
        <div className='handle flex h-full w-full items-center justify-center'>
          <p className='text-center text-xl text-primaryText'>Загрузка...</p>
        </div>
      ) : isError && !isGuide ? (
        <div className='handle flex h-full w-full items-center justify-center'>
          <p className='text-center text-xl text-primaryText'>Ошибка</p>
        </div>
      ) : !favoriteCharacter && !guideFavoriteCharacter ? (
        <div className='handle flex h-full w-full items-center justify-center'>
          <p className='px-2 text-center text-[1vw] text-primaryText'>Не выбран любимый персонаж</p>
        </div>
      ) : (
        <div className='handle relative flex h-full w-[90%] flex-col items-center'>
          <div className='my-[3%] flex aspect-[179/49] w-full items-center justify-center rounded-[1.5625rem] bg-tertiary'>
            <p className='pointer-events-none px-2 text-center text-[1vw] leading-[97.8%] text-primaryText'>
              Любимый персонаж
            </p>
          </div>
          <div className='flex w-full flex-1 flex-col items-center'>
            <div className='aspect-[179/240] w-full rounded-[1.25rem] border-2 border-primaryText bg-tertiary'>
              <img
                className='pointer-events-none h-full w-full rounded-[1.25rem]'
                src={`/${
                  isGuide ? guideFavoriteCharacter?.miniature_img : favoriteCharacter?.miniature_img
                }`}
              />
            </div>
            <div className='flex w-full flex-1 items-center justify-center overflow-hidden'>
              <p className='pointer-events-none max-h-full overflow-hidden text-center text-[0.7vw] leading-[97.8%] text-white'>
                {isGuide ? guideFavoriteCharacter?.name : favoriteCharacter?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FavioriteCharacter
