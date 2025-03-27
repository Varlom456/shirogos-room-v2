import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChangeGender from '../Settings/ChangeGender'
import Connections from '../Settings/Connections'
import { useUserInfo } from '@/api/useUserInfo'
import ChangeUsername from '../Settings/ChangeUsername'
import ChangeBirthday from '../Settings/ChangeBirthday'
import ChangeProfileImg from '../Settings/ChangeProfileImg'
import { isUrl } from '@/utils/isUrl'
import noProfilePictureIcon from '@/assets/no-profile-picture-icon.webp'
import ChangeMiniature from '../Settings/ChangeMiniature'

const RoomSettings: FC = () => {
  const location = useLocation()
  const isActive = location.pathname.includes('/room/settings')

  const { isLoading, isError, isSuccess, data: userInfo } = useUserInfo()

  const [username, setUsername] = useState<string>('')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [gender, setGender] = useState<string>('')

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        setUsername(userInfo?.username ?? '')
        setBirthday(userInfo?.birthday ? new Date(userInfo?.birthday) : null)
        setGender(String(userInfo?.gender))
      }
    }
  }, [isLoading])

  return isLoading ? (
    <div
      className={
        (isActive ? 'block' : 'hidden') +
        ' flex h-[65.5625rem] w-full items-center justify-center rounded-[2.3125rem] bg-tertiary'
      }
    >
      <p className='text-center text-xl'>Загрузка...</p>
    </div>
  ) : isError ? (
    <div
      className={
        (isActive ? 'block' : 'hidden') +
        ' flex h-[65.5625rem] w-full items-center justify-center rounded-[2.3125rem]'
      }
    >
      <p className='text-center text-xl'>Ошибка</p>
    </div>
  ) : (
    <div
      className={
        (isActive ? 'block' : 'hidden') +
        ' flex w-full justify-between rounded-[2.3125rem] bg-tertiary pb-[19.25rem] pl-8 pr-[1.52rem] pt-[1.56rem]'
      }
    >
      <div className='h-[36.375rem] w-[66%] rounded-tl-[1.25rem] border-[1px] border-[#646464] px-4 pb-7'>
        <ChangeUsername
          initialValue={userInfo.username ?? ''}
          value={username}
          setValue={setUsername}
        />
        <ChangeBirthday initialValue={userInfo.birthday} value={birthday} setValue={setBirthday} />
        <ChangeGender gender={gender} setGender={setGender} />
        <Connections
          discord={userInfo.discord}
          telegram={userInfo.telegram}
          twitch={userInfo.twitch}
          vk={userInfo.vk}
        />
      </div>
      <div className='w-[32%]'>
        {!!userInfo.profile_img ? (
          <img
            className='mb-[0.62rem] w-full rounded-[1.5625rem]'
            src={
              isUrl(userInfo.profile_img ?? '')
                ? userInfo.profile_img
                : `/${userInfo.profile_img}`
            }
            alt='profile-img'
          />
        ) : (
          <img
            className='mb-[0.62rem] w-full rounded-[1.5625rem]'
            src={noProfilePictureIcon}
            alt='profile-img'
          />
        )}

        <ChangeMiniature
          isDisabled={!userInfo.profile_img}
          profileImg={
            isUrl(userInfo.profile_img ?? '')
              ? userInfo.profile_img
              : `/${userInfo.profile_img}`
          }
        />
        <ChangeProfileImg />
      </div>
    </div>
  )
}

export default RoomSettings
