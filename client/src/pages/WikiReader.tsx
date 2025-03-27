import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '@/layout/Header/Header'
import WikiSidebar from '@/components/Wiki/Reader/WikiSidebar'
import WikiCard from '@/components/Wiki/Reader/WikiCard'
import WikiInfoList from '@/components/Wiki/Reader/WikiInfoList'
import { useCharacter } from '@/api/useCharacter'

const WikiReader: FC = () => {
  const params = useParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [characterId, setCharacterId] = useState<string | null>(null)

  const { data: character, isLoading, isError } = useCharacter(characterId)

  useEffect(() => {
    if (params.id) {
      setCharacterId(params.id)
    }
  }, [])

  return (
    <>
      <Header withLine={true} isFixed={true} />
      {isLoading ? (
        <div className='flex h-screen w-screen items-center justify-center pt-[5.25rem]'>
          <p className='text-xl text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-screen w-screen items-center justify-center pt-[5.25rem]'>
          <p className='text-xl text-primaryText'>Ошибка</p>
        </div>
      ) : (
        !!character && (
          <>
            <WikiSidebar
              characteristics={character.characterCharacteristics}
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
            />
            <div
              style={{
                backgroundImage: `linear-gradient(to right, #323232 43.23%, #181818 100%),  url(
                /${character?.original_img})`
              }}
              className='relative mt-[5.25rem] flex min-h-screen justify-center bg-cover bg-no-repeat pb-[4.7rem] pt-[4.45rem]'
            >
              <WikiCard
                name={character.name}
                img={character.original_img}
                subsubtitle={character.subSubTitle}
                subtitle={character.subTitle}
                isSidebarOpen={isSidebarOpen}
              />
              <WikiInfoList descriptions={character.characterDescriptions} />
              <div
                style={{
                  backgroundImage: `url(
                  /${character?.original_img})`
                }}
                className='absolute inset-0 h-full w-full bg-cover bg-[3.8vw_35%] bg-no-repeat opacity-25'
              />
              <div
                className={
                  (isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0') +
                  ' absolute inset-0 z-20 h-full w-full bg-tertiary bg-opacity-50 transition-all duration-1000 ease-out'
                }
              />
            </div>
          </>
        )
      )}
    </>
  )
}

export default WikiReader
