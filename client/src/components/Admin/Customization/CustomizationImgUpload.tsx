import CropModal from '@/components/CropModal'
import { cn } from '@/utils/cn'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface ICustomizationImgUpload {
  imgSrc: string | null
  img: File | null
  setImg: ((value: File | null) => void) | null
  isHasMiniature?: boolean
  miniatureProps?: {
    isVisible: boolean
    setIsVisible: (value: boolean) => void
    setMiniature: (value: File | null) => void
    canvas: HTMLCanvasElement | null
    setInNew?: (value: boolean) => void
  }
  isFrame?: boolean
}

const CustomizationImgUpload: FC<ICustomizationImgUpload> = ({
  imgSrc,
  img,
  setImg,
  isHasMiniature = false,
  miniatureProps,
  isFrame = false
}) => {
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && setImg) {
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
    <div className={'relative flex h-full w-full items-center justify-center transition-all'}>
      <input
        ref={inputRef}
        className='absolute z-10 aspect-[104/83] w-full bg-transparent opacity-0'
        accept='image/*'
        type='file'
        onChange={(e) => handleFileChange(e)}
      />
      <div
        className={
          (isImgUploaded ? 'invisible opacity-0' : 'visible opacity-100') +
          ' aspect-[105/69] w-full bg-primaryText transition-all'
        }
      />
      <img
        ref={imgRef}
        className={cn(
          'absolute h-full',
          {
            'visible opacity-100': isImgUploaded,
            'invisible opacity-0': !isImgUploaded
          },
          {
            'h-[83px] w-[104px]': isFrame,
            'object-contain': !isFrame
          }
        )}
        src={
          !!imgSrc
            ? imgSrc.includes('blob')
              ? `${imgSrc}`
              : `/${imgSrc}`
            : '#'
        }
        alt='badge-img'
      />

      {isHasMiniature && miniatureProps && (
        <CropModal
          aspect={236 / 200}
          img={imgRef.current?.src ?? ''}
          isVisible={miniatureProps.isVisible}
          setIsVisible={miniatureProps.setIsVisible}
          setMiniature={miniatureProps.setMiniature}
          canvas={miniatureProps.canvas}
          setInNew={miniatureProps.setInNew}
        />
      )}
    </div>
  )
}

export default CustomizationImgUpload
