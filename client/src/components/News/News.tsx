import { FC, useEffect, useRef, useState } from 'react'
import { useNews } from '@/api/useNews'
import { formatDateNews } from '@/utils/formatDate'
import { useNewsCount } from '@/api/useNewsCount'
import { Scrollbar } from 'react-scrollbars-custom'
import { cn } from '@/utils/cn'

interface NewsProps {
  className?: string
}

const News: FC<NewsProps> = ({ className }) => {
  const [skip, setSkip] = useState<number>(0)
  const { isLoading, isFetching, isError, data: news, refetch } = useNews(skip)
  const { data: newsCount } = useNewsCount()
  const [isNextBttnHovered, setIsNextBttnHovered] = useState<boolean>(false)
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false)

  const clickNextNews = () => {
    setSkip((prev) => prev + 1)
    refetch()
  }

  const checkIsTextOverflow = () => {
    if (!isFetching && !isError) {
      if (textRef.current) {
        if (textRef.current.clientHeight > 150) {
          setIsTextOverflow(true)
        } else {
          setIsTextOverflow(false)
        }
      }
    }
  }

  useEffect(() => {
    checkIsTextOverflow()
  }, [textRef, isFetching])

  return (
    <div
      className={cn(
        'news flex h-[9.375rem] w-full items-center justify-between rounded-[2.3125rem] bg-tertiary bg-opacity-40 pr-[0.9375rem] transition-all',
        className
      )}
    >
      {isLoading || isFetching ? (
        <p className='flex h-full w-full items-center justify-center text-xl text-primaryText'>
          Загрузка...
        </p>
      ) : isError ? (
        <p className='flex h-full w-full items-center justify-center text-xl text-primaryText'>
          Ошибка 0_0
        </p>
      ) : !news || (newsCount && newsCount?.count <= 0) ? (
        <p className='flex h-full w-full items-center justify-center text-xl text-primaryText'>
          Новостей нет :/
        </p>
      ) : (
        <>
          <img
            className='h-full w-[11.75rem] rounded-[2.3125rem] object-cover'
            src={`/${news?.news_img}`}
            alt='announce-img'
          />
          {isTextOverflow ? (
            <Scrollbar noDefaultStyles style={{ flex: '1 1 0%', height: '100%' }}>
              <p
                ref={textRef}
                className='ml-6 px-2 font-secondary text-[1.5625rem] font-bold text-primaryText'
              >
                {news?.text}
              </p>
            </Scrollbar>
          ) : (
            <p
              ref={textRef}
              className='ml-6 flex-1 px-2 font-secondary text-[1.5625rem] font-bold text-primaryText'
            >
              {news?.text}
            </p>
          )}
          <p
            className={
              (isNextBttnHovered && 'mr-[1.37rem]') +
              ' ml-2.5 mr-8 max-w-[6.875rem] text-center font-secondary text-xl font-bold leading-[97.795%] text-primaryText transition-all'
            }
          >
            {news && formatDateNews(news.created_at)}
          </p>
          <button
            className={
              (isNextBttnHovered ? 'h-[5.0625rem] w-[1.1875rem] rounded-[0.3125rem] ' : '') +
              (skip + 1 === newsCount?.count ? 'invisible opacity-0 ' : 'visible opacity-100 ') +
              'h-[5rem] w-[0.5625rem] rounded-[1.5625rem] bg-[#EBE984] transition-all'
            }
            onClick={clickNextNews}
            onMouseOver={() => setIsNextBttnHovered(true)}
            onMouseLeave={() => setIsNextBttnHovered(false)}
          />
        </>
      )}
    </div>
  )
}

export default News
