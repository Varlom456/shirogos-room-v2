import { useRoomByTwitchLogin } from '@/api/useRoomByTwitchLogin'
import RoomMainContent from '@/components/Room/Main/RoomMainContent'
import { colorVariants } from '@/consts/roomColors'
import Header from '@/layout/Header/Header'
import { cn } from '@/utils/cn'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const Guide: FC = () => {
  const { twitchLogin } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [fromSection, setFromSection] = useState<'screen' | 'preview' | null>(null)

  const {
    data: guideRoom,
    isLoading: isGuideLoading,
    isError: isGuideError,
    error: guideError
  } = useRoomByTwitchLogin(twitchLogin ?? '')

  useEffect(() => {
    if (searchParams.get('from') === 'guideScreen') {
      setFromSection('screen')
    } else if (searchParams.get('from') === 'guidePreview') {
      setFromSection('preview')
    } else {
      setFromSection(null)
    }

    searchParams.delete('from')
    setSearchParams(searchParams)
  }, [])

  return (
    <>
      <Header
        isFixed={false}
        withLine={false}
        room_color={guideRoom?.roomAppearance?.active_room_color}
      />
      {isGuideLoading ? (
        <div className='flex h-[calc(100vh-5.25rem)] w-full items-center justify-center'>
          <p className='text-xl'>Загрузка...</p>
        </div>
      ) : isGuideError &&
        guideError instanceof AxiosError &&
        guideError.response?.status === 400 ? (
        <div className='flex h-[calc(100vh-5.25rem)] w-full flex-col items-center justify-center'>
          <p className='mb-6 text-4xl'>Комната не создана</p>
          <Link
            to={
              fromSection === 'screen'
                ? '/?to=guideScreen'
                : fromSection === 'preview'
                ? '/?to=guidePreview'
                : '/'
            }
            className='rounded-[2.3125rem] bg-primary px-8 py-4 text-xl text-primaryText transition-all hover:bg-primaryHover'
          >
            {fromSection === 'screen' || fromSection === 'preview' ? 'Назад' : 'На главную'}
          </Link>
        </div>
      ) : isGuideError ? (
        <div className='flex h-[calc(100vh-5.25rem)] w-full items-center justify-center'>
          <p className='text-xl'>Ошибка</p>
        </div>
      ) : (
        <div
          className={`relative z-10 min-h-[calc(100vh-5.25rem)] bg-tertiary ${
            colorVariants.text[guideRoom.roomAppearance.active_room_color]
          }`}
        >
          <div
            style={{
              backgroundImage: !!guideRoom.roomAppearance.selected_background
                ? `url(/${guideRoom.roomAppearance
                    .selected_background?.img})`
                : "url('/images/room-default-bg.webp')"
            }}
            className={cn(`absolute inset-0 -z-20 h-full w-full opacity-30`, {
              'bg-cover bg-center bg-no-repeat': !!guideRoom.roomAppearance.selected_background
            })}
          />
          <div
            className={`h-full w-full ${
              colorVariants.bgRoomGradientBg[guideRoom.roomAppearance.active_room_color]
            } absolute inset-0 -z-10`}
          />

          <div className='mx-auto w-[73.85vw] pb-[6.8125rem] pt-[0.9375rem]'>
            <div className='flex h-full w-full justify-between'>
              <RoomMainContent
                room={guideRoom?.room}
                editor={guideRoom?.editor}
                isGuide
                widgetsInfo={guideRoom?.widgetsInfo}
                guideRoomAppearance={guideRoom?.roomAppearance}
                fromSection={fromSection}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Guide
