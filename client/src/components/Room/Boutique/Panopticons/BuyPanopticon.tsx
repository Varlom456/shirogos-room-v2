import { RoomAppearanceContext } from '@/Context'
import { useBuyPanopticon } from '@/api/useBuyPanopticon'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'
import { IPanopticon } from '@/types/panopticon.interface'
import { cn } from '@/utils/cn'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
import { FC, useContext, useEffect } from 'react'

interface IBuyPanopticon {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  panopticon: IPanopticon | null
  setBuyedPanopticons: React.Dispatch<React.SetStateAction<number[] | null>>
}

const BuyPanopticon: FC<IBuyPanopticon> = ({
  isVisible,
  setIsVisible,
  panopticon,
  setBuyedPanopticons
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate, isSuccess, error } = useBuyPanopticon()

  const buyPanopticon = () => {
    if (panopticon) {
      mutate({ panopticonId: panopticon?.id })
    }
  }

  useToastOnSuccess(isSuccess, successBuyToast)
  useToastOnError(error, notEnoughDangoToast)

  useEffect(() => {
    if (isSuccess && panopticon) {
      setBuyedPanopticons((prev) => (!!prev ? [...prev, panopticon?.id] : [panopticon?.id]))
      setIsVisible(false)
    }
  }, [isSuccess])

  return (
    <div
      className={cn('absolute inset-0 z-40 h-full w-full transition-all', {
        'visible opacity-100': isVisible,
        'invisible opacity-0': !isVisible
      })}
    >
      <div
        className={`h-[22rem] w-full ${
          colorVariants.bgRoomGradientRevert[roomAppearance.active_room_color]
        } top-[50%] z-30 flex translate-y-[50%] flex-col items-center pt-7 transition-all`}
      >
        <p className='mb-[1.0625rem] text-center text-[2.5rem] leading-7 text-primaryText'>
          Покупаем?
        </p>
        <div className='relative mb-4 flex aspect-[236/200] w-[12.8125rem] items-center justify-center rounded-[1.5625rem] border-4 border-[#EBE984] bg-tertiary'>
          <img
            className='h-full w-full rounded-[1.5625rem] opacity-10 blur-[2px]'
            src={`/${
              panopticon?.miniatureImg ?? panopticon?.img
            }`}
            alt='panopticon-img'
          />
          <p className='absolute px-2 text-center text-xl leading-none text-[#EBE984]'>
            {panopticon?.cost} ДО
          </p>
        </div>
        <div className='flex w-full justify-center'>
          <button
            onClick={buyPanopticon}
            className={`h-[3.75rem] w-[12.6%] min-w-[7rem] ${
              colorVariants.bg[roomAppearance.active_room_color]
            } ${
              colorVariantsHover.bg[roomAppearance.active_room_color]
            } mr-2.5 rounded-l-[2.125rem] text-[1.5625rem] text-primaryText transition-all hover:text-white`}
          >
            ДАН
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className='h-[3.75rem] w-[12.6%] min-w-[7rem] rounded-r-[2.125rem] bg-tertiary px-2 text-center text-[1.5625rem] leading-none text-primaryText transition-all hover:bg-secondaryHover hover:text-white'
          >
            НЕ ДАН
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyPanopticon
