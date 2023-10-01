import { useBirthdayAward } from '@/api/useBirthdayAward'
import { useUpdateBirthdayAward } from '@/api/useUpdateBirthdayAward'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'

const BirthdayAward: FC = () => {
	const { isLoading, isError, data: awardData } = useBirthdayAward()
	const { mutate } = useUpdateBirthdayAward()
	const [award, setAward] = useState<string>('')

	const onBlurHandler = () => {
		if (isNumber(award)) {
			mutate({ award: +award })
			console.log(`${award} ДО`)
		} else {
			console.log('Награда должна быть числом')
		}
	}

	useEffect(() => {
		if (!isLoading && !isError) {
			setAward(String(awardData.award))
		}
	}, [isLoading, isError])

	return (
		<div className='w-[33.6%] h-full flex flex-col'>
			<div className='w-full h-[3.8125rem] bg-tertiary flex justify-center items-center'>
				<p className='text-[#FFF] text-[1.5625rem]'>Награда за ДР</p>
			</div>
			<div className='w-full flex-1 bg-secondary flex justify-center items-center '>
				<input
					onBlur={onBlurHandler}
					value={award}
					onChange={e => setAward(e.target.value)}
					className='bg-transparent outline-none text-xl text-center w-full text-[#FFF] placeholder:text-[#B7B7B7]'
					placeholder='(в до)'
				/>
			</div>
		</div>
	)
}

export default BirthdayAward
