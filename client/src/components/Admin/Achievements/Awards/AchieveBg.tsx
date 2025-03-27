import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IAchieveBg {
  selectedAwardType: string | null
  imgSrc: string | null
  img: File | null
  setImg: React.Dispatch<React.SetStateAction<File | null>>
}

const AchieveBg: FC<IAchieveBg> = ({ selectedAwardType, imgSrc, img, setImg }) => {
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  useEffect(() => {
    if (!imgSrc && !img) {
      setIsImgUploaded(false)
      imgRef.current?.setAttribute('src', '')
    } else {
      setIsImgUploaded(true)
    }
  }, [imgSrc, img])

  return (
    <div
      className={
        (selectedAwardType === 'achieve-bg' ? 'block ' : 'hidden ') +
        'relative flex w-full flex-1 items-center justify-center transition-all'
      }
    >
      <input
        ref={inputRef}
        className='absolute z-10 aspect-[213/30] w-full bg-transparent opacity-0'
        accept='image/*'
        type='file'
        onChange={(e) => handleFileChange(e)}
      />
      <div
        className={
          (isImgUploaded ? 'invisible opacity-0' : 'visible opacity-100') +
          ' aspect-[213/30] w-full bg-primaryText transition-all'
        }
      />
      <img
        ref={imgRef}
        className={
          (isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') +
          ' absolute mx-auto aspect-[213/30] w-full'
        }
        src={
          !!imgSrc
            ? imgSrc.includes('blob')
              ? `${imgSrc}`
              : `/${imgSrc}`
            : '#'
        }
        alt='award-img'
      />
    </div>
  )
}

export default AchieveBg
