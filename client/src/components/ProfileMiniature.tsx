import noProfilePic from '@/assets/no-profile-picture-icon.webp'
import { IFrame } from '@/types/frame.interface'
import { cn } from '@/utils/cn'
import { isUrl } from '@/utils/isUrl'
import { FC } from 'react'

interface IProfileMiniature {
  miniature_img: string | null
  profile_img: string | null
  username: string
  frame: IFrame | null
  className?: string
  containerClassName?: string
  withHoverEffect?: boolean
}

const ProfileMiniature: FC<IProfileMiniature> = ({
  miniature_img,
  profile_img,
  username,
  frame,
  className,
  containerClassName,
  withHoverEffect = false
}) => {
  return (
    <div className={cn('relative z-30', containerClassName)}>
      <img
        className={cn('object-cover', className)}
        src={
          miniature_img
            ? `${miniature_img}`
            : profile_img
            ? isUrl(profile_img)
              ? profile_img
              : `${profile_img}`
            : noProfilePic
        }
        alt={`${username}-pic`}
      />
      {/* <img
        className={cn('object-cover', className)}
        src={
          miniature_img
            ? `${import.meta.env.VITE_SERVER_URL}/${miniature_img}`
            : profile_img
            ? isUrl(profile_img)
              ? profile_img
              : `${import.meta.env.VITE_SERVER_URL}/${profile_img}`
            : noProfilePic
        }
        alt={`${username}-pic`}
      /> */}
      {!!frame && (
        <img
          className='pointer-events-none absolute -top-[18px] right-[48px] z-10 w-[calc(100%)]  min-w-[calc(100%)] max-w-[calc(100%)] scale-[70%] select-none'
          src={`${import.meta.env.VITE_SERVER_URL}/${frame.img}`}
          alt='frame'
        />
      )}

      {withHoverEffect && (
        <div className='pointer-events-none invisible absolute inset-0 flex h-full w-full items-center justify-center bg-[#383134] bg-opacity-70 opacity-0 group-hover:visible group-hover:opacity-100'>
          <p className='text-[0.9375rem] text-primaryText text-opacity-[0.55]'>ГОУ!</p>
        </div>
      )}
    </div>
  )
}

export default ProfileMiniature
