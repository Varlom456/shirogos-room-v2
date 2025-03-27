import { FC } from 'react'
import discordIcon from '@/assets/auth/discord.png'
import twitchIcon from '@/assets/auth/twitch.png'
import vkIcon from '@/assets/auth/vk.png'
import tgIcon from '@/assets/auth/telegram.png'
import AuthBttn from './AuthBttn'

interface IAuthModal {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type AuthServices = 'Discord' | 'Twitch' | 'Vk' | 'Telegram'

export interface IAuthBttn {
  service: AuthServices
  icon: string
  clickEvent: () => void
  isDisabled?: boolean
}

const AuthModal: FC<IAuthModal> = ({ visible, setVisible }) => {
  const clickAuthDiscord = () => {
    console.log('click auth discord')
  }

  const clickAuthTwitch = () => {
    window.location.href = `/api/auth/twitch`
  }

  const clickAuthVk = () => {
    console.log('click auth vk')
  }

  const clickAuthTg = () => {
    console.log('click auth telegram')
  }

  const authBttns: IAuthBttn[] = [
    {
      service: 'Discord',
      icon: discordIcon,
      clickEvent: clickAuthDiscord,
      isDisabled: true
    },
    {
      service: 'Twitch',
      icon: twitchIcon,
      clickEvent: clickAuthTwitch
    },
    { service: 'Vk', icon: vkIcon, clickEvent: clickAuthVk, isDisabled: true },
    {
      service: 'Telegram',
      icon: tgIcon,
      clickEvent: clickAuthTg,
      isDisabled: true
    }
  ]

  return (
    <div
      className={
        'absolute z-50 flex h-full w-full items-center justify-center bg-secondary bg-opacity-50 transition-all ' +
        (visible ? 'visible opacity-100' : 'invisible opacity-0')
      }
      onClick={() => setVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='rounded-[37px] bg-secondary bg-opacity-90 px-[3.6rem] pb-12 pt-16 text-center'
      >
        <p className='text-[3.75rem] leading-none text-[#FFFFFF]'>Вход</p>
        <p className='-mt-3 mb-5 font-secondary text-[2.1875rem] font-bold leading-none'>
          <span className='text-[#FFFFFF]'>в</span> комнату:
        </p>
        <div className='flex max-w-[230px] flex-wrap items-center justify-between'>
          {authBttns.map((bttn) => (
            <AuthBttn key={bttn.icon} bttn={bttn} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthModal
