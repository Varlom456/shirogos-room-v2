import { FC } from 'react'

interface ZoomedImageModalProps {
  img: string | null
  isVisible: boolean
  onClose: () => void
}

const ZoomedImageModal: FC<ZoomedImageModalProps> = ({ img, isVisible, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        `fixed inset-0 z-50 flex h-screen w-screen cursor-zoom-out items-center justify-center bg-black bg-opacity-60 transition-all`
      }
    >
      <div className='flex h-[90%] w-[90%] items-center justify-center'>
        {img && (
          <img
            src={`/${img}`}
            alt='img'
            className='h-full w-full object-contain'
          />
        )}
      </div>
    </div>
  )
}

export default ZoomedImageModal
