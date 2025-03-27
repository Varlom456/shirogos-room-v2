import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IEditorImgUpload {
  title: string
  img?: File | null
  imgSrc?: string | null
  setImg: React.Dispatch<React.SetStateAction<File | null>>
  className?: string
  isDisabled?: boolean
}

const EditorImgUpload: FC<IEditorImgUpload> = ({
  title,
  img,
  imgSrc,
  setImg,
  className,
  isDisabled
}) => {
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

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
      className={(!!className ? className : '') + ' flex w-[66.25rem] border-[5px] border-primary'}
    >
      <div className='flex h-full w-[24.5%] items-center justify-center bg-tertiary'>
        <p className='px-2 text-[1.5625rem] text-[#FFF]'>{title}</p>
      </div>
      <div
        className={
          (isDisabled ? '' : 'hover:bg-opacity-30 ') +
          'relative flex h-full flex-1 items-center justify-center bg-primaryText bg-opacity-20 transition-all'
        }
      >
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          className='absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default'
          onChange={(e) => handleFileChange(e)}
          disabled={isDisabled}
        />
        <img
          ref={imgRef}
          src={
            !!imgSrc
              ? imgSrc.includes('blob')
                ? `${imgSrc}`
                : `/${imgSrc}`
              : '#'
          }
          alt='avatar'
          className={
            (isImgUploaded ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
            `pointer-events-none absolute h-full select-none`
          }
        />
        <p
          className={
            (isImgUploaded ? 'invisible opacity-0 ' : 'visible opacity-100 ') +
            'pointer-events-none select-none text-center text-[3.125rem] text-[#FFF] text-opacity-25'
          }
        >
          Загрузить изображение
        </p>
      </div>
    </div>
  )
}

export default EditorImgUpload
