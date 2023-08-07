import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'
import searchIcon from '@/assets/search-icon.png'
import DonatesList from '@/components/Admin/Donates/DonatesList'
import AddDonater from '@/components/Admin/Donates/AddDonater'

const Donates: FC = () => {
	return (
		<AdminWrapper>
			<div className='w-[62.6vw] h-[2.9375rem] bg-tertiary relative mt-[0.7rem] ml-4 flex items-center'>
				<input className='w-full h-full bg-tertiary rounded-[1.25rem] outline-none text-[#FFF] font-secondary font-normal text-[1.5625rem] pl-[4.77rem] caret-primary' />
				<img
					className='pointer-events-none absolute left-3'
					src={searchIcon}
					alt='search-icon'
				/>
			</div>
			<DonatesList />
			<AddDonater />
		</AdminWrapper>
	)
}

export default Donates
