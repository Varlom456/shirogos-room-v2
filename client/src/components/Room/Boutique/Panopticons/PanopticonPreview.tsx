import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { IBuyedPanopticon } from '@/types/room.interface'
import { formatDate } from '@/utils/formatDate'
import { FC, useContext, useEffect, useRef, useState } from 'react'

interface IPanopticonPreview {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  panopticon: IBuyedPanopticon | null
}

const PanopticonPreview: FC<IPanopticonPreview> = ({ isVisible, setIsVisible, panopticon }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isVerticalImg, setIsVericalImg] = useState<boolean>(true)
  const roomAppearance = useContext(RoomAppearanceContext)

  useEffect(() => {
    if (imgRef.current && isVisible) {
      if (imgRef.current.offsetWidth >= imgRef.current.offsetHeight) {
        setIsVericalImg(true)
      } else {
        setIsVericalImg(false)
      }
    }
  }, [isVisible])

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute z-30 flex h-full w-full px-[1.3rem] pb-[2.6rem] pt-[3.92rem] transition-all'
      }
    >
      <div className='mr-[0.87rem] flex w-[14.375rem] flex-col justify-between pb-[1.02rem] pt-[1.13rem]'>
        <button
          onClick={() => setIsVisible(false)}
          className='h-[5.4375rem] w-full rounded-[1.5625rem] bg-tertiary bg-opacity-75 text-[1.875rem] text-[#EBE984] transition-all hover:bg-opacity-60'
        >
          Назад
        </button>
        <div
          className={`h-[23.6875rem] w-full border-[3px] bg-tertiary bg-opacity-75 ${
            colorVariants.border[roomAppearance.active_room_color]
          } flex flex-col items-center rounded-[1.5625rem]`}
        >
          <div className='flex w-[90%] items-center justify-center py-10'>
            <p className='text-center text-[1.5625rem] leading-[97.795%] text-primaryText'>
              {panopticon?.Panopticon.title ? (
                <>
                  “
                  <span className={`${colorVariants.text[roomAppearance.active_room_color]}`}>
                    {panopticon?.Panopticon.title}
                  </span>
                  ”
                </>
              ) : (
                'Название отсутствует'
              )}
            </p>
          </div>

          <p className='flex w-3/4 flex-1 items-center pb-8 text-center text-[0.9375rem] leading-[97.795%] text-primaryText'>
            {panopticon?.Panopticon.description
              ? panopticon?.Panopticon.description
              : 'Описание отсутствует'}
          </p>
        </div>
        <div className='flex h-[3.6875rem] w-full flex-col items-center justify-center rounded-[1.5625rem] bg-tertiary bg-opacity-75'>
          <p className='text-[0.9375rem] leading-[97.795%] text-primaryText'>
            Получено за {panopticon?.buyed_cost} до
          </p>
          <p className='text-xl leading-[97.795%] text-primaryText'>
            {panopticon?.buyed_at ? formatDate(panopticon?.buyed_at) : 'Дата отсутствует'}
          </p>
        </div>
      </div>
      <div className='relative flex flex-1 items-center justify-center'>
        <img
          ref={imgRef}
          className={(isVerticalImg ? 'rounded-[1.5625rem]' : '') + ' absolute z-20 max-h-full'}
          src={`/${panopticon?.Panopticon.img}`}
        />
        <img
          className={
            (isVerticalImg ? 'hidden' : 'block') +
            ' absolute h-full rounded-[1.5625rem] object-cover opacity-20'
          }
          src={`/${panopticon?.Panopticon.img}`}
        />
      </div>
    </div>
  )
}

export default PanopticonPreview
