import { cn } from '@/utils/cn'
import { FC, useLayoutEffect, useRef } from 'react'

interface MangaPageProps {
  mangaWidth: number
  img: string | null
  isLoading: boolean
}

const MangaPage: FC<MangaPageProps> = ({ mangaWidth, img, isLoading }) => {
  const isAvailable = !!img && !isLoading
  const imgRef = useRef<HTMLImageElement | null>(null)

  useLayoutEffect(() => {
    if (!img) return
    window.requestAnimationFrame(() => {
      imgRef.current?.setAttribute('src', `/${img}`)
      window.scrollTo(0, 0)
    })
  }, [img])

  return (
    <div
      className={cn('w-full', {
        'aspect-[5/8]': !isAvailable
      })}
    >
      <img
        ref={imgRef}
        style={{ width: mangaWidth + 'vw' }}
        className={cn('select-none transition-all', {
          'visible opacity-100': isAvailable,
          'invisible opacity-0': !isAvailable
        })}
        alt='manga-img'
      />
      <div
        className={cn('absolute inset-0 h-full w-full bg-primaryText transition-all', {
          'invisible opacity-0': isAvailable,
          'visible opacity-100': !isAvailable
        })}
      />
    </div>
  )
}

export default MangaPage
