import { FC } from 'react'
import noProfilePic from '@/assets/no-profile-picture-icon.webp'
import { isUrl } from '@/utils/isUrl'
import { cn } from '@/utils/cn'
import { IFrame } from '@/types/frame.interface'

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
          !!miniature_img
            ? `/${miniature_img}`
            : !!profile_img
            ? isUrl(profile_img)
              ? profile_img
              : `/${profile_img}`
            : noProfilePic
        }
        alt={`${username}-pic`}
      />
      {!!frame && (
        <img
          className='pointer-events-none absolute -right-[2px] -top-[2px] z-10 aspect-[104/83] w-[calc(100%+14px)] min-w-[calc(100%+14px)] max-w-[calc(100%+14px)] select-none'
          src={`/${frame.img}`}
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
