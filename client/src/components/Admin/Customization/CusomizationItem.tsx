import { FC, useEffect, useRef, useState } from 'react'
import { BadgeType, } from '@/types/badge.interface'
import type { CustomizationSection } from '@/pages/Admin/Customization'
import { cn } from '@/utils/cn'
import CustomizationImgUpload from './CustomizationImgUpload'
import CustomizationCheckbox from './ui/CustomizationCheckbox'
import { clearCanvas } from '@/utils/cropUtils'

interface CusomizationItemProps {
	create: () => void
	update: () => void
	remove: () => void
	isNew: boolean
	section: CustomizationSection
	customizationItem: {
		badgeType: {
			value: BadgeType
			setValue: (value: BadgeType) => void
		} | null
		isForSale: {
			value: boolean
			setValue: (value: boolean) => void
		}
		price: {
			value: string
			setValue: (value: string) => void
		}
		title: {
			value: string
			setValue: (value: string) => void
		}
		description: {
			value: string
			setValue: (value: string) => void
		} | null
		img: {
			src: string | null
			value: File | null
			setValue: (value: File | null) => void
		} | null
		miniature: {
			src: string | null
			value: File | null
			setValue: (value: File | null) => void
			isNew: boolean
			setIsNew: (value: boolean) => void
		} | null
	}
}

const CusomizationItem: FC<CusomizationItemProps> = ({ create, update, remove, isNew, section, customizationItem }) => {
	const [isMiniatureModalVisible, setIsMiniatureModalVisible] = useState<boolean>(false)
	const miniatureRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (!!customizationItem.img?.value) {
			customizationItem.miniature?.setIsNew(true)
			customizationItem.miniature?.setValue(null)
			clearCanvas(miniatureRef.current!)
		}
	}, [customizationItem.img?.value])

	return (
		<div className='relative mb-6 flex h-[6.9375rem] w-full items-center justify-between last-of-type:mb-0'>
			<div className={cn('flex h-full w-[56.81rem] items-center pr-[7%]', {
				'w-[68.06rem]': section === 'badges',
				'w-[83.44rem]': section === 'panopticons',
				'w-[37.3125rem] pr-0': section === 'roles'
			})}>
				{section === 'badges' && (
					<div className='flex h-full w-[17.5%] items-center justify-center'>
						<select
							defaultValue={customizationItem.badgeType?.value || 'common'}
							onChange={(e) => customizationItem.badgeType?.setValue(e.target.value as BadgeType)}
							className='h-full w-full cursor-pointer bg-transparent text-center text-[0.9375rem] text-[#FFF] hover:bg-secondaryHover'
						>
							<option value='unique'>Уникальный</option>
							<option value='copyright'>Копирайтный</option>
							<option value='common'>Обычный</option>
						</select>
					</div>
				)}

				<div className={cn('flex h-full w-[18%] items-center justify-center', {
					'w-[13%]': section === 'badges',
					'w-[12.3%]': section === 'panopticons',
					'w-[27.5%]': section === 'roles'
				})}>
					<CustomizationCheckbox
						disabled={!isNew}
						checked={customizationItem.isForSale.value}
						onChange={() => customizationItem.isForSale.setValue(!customizationItem.isForSale.value)}
					/>
				</div>

				<div className={cn('flex h-full w-[21.7%] items-center justify-center px-4', {
					'w-[25%]': section === 'badges',
					'w-[15%]': section === 'panopticons',
					'w-[33%]': section === 'roles'
				})}>
					<input
						className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
						value={customizationItem.price.value}
						onChange={(e) => customizationItem.price.setValue(e.target.value)}
					/>
				</div>

				<div className={cn('flex h-full flex-1 items-center justify-center px-4', {
					'flex-none w-[18%]': section === 'panopticons',
				})}>
					<input
						className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
						value={customizationItem.title.value}
						onChange={(e) => customizationItem.title.setValue(e.target.value)}
					/>
				</div>

				{section === 'panopticons' && <div className='flex h-full flex-1 items-center justify-center px-4'>
					<textarea
						className='h-full w-full resize-none border-none bg-transparent py-2 text-center text-xs text-[#FFF] outline-none'
						value={customizationItem.description?.value}
						onChange={(e) => customizationItem.description?.setValue(e.target.value)}
					/>
				</div>}

				{!!customizationItem.img && <div className={cn('flex h-full w-[12%] items-center justify-center', {
					'mr-4 w-[10%]': section === 'panopticons'
				})}>
					<CustomizationImgUpload
						imgSrc={customizationItem.img?.src ?? null}
						img={customizationItem.img?.value ?? null}
						setImg={customizationItem.img?.setValue ?? null}
						isHasMiniature={!!customizationItem.miniature}
						miniatureProps={!!customizationItem.miniature ? {
							isVisible: isMiniatureModalVisible,
							setIsVisible: setIsMiniatureModalVisible,
							setMiniature: customizationItem.miniature.setValue,
							canvas: miniatureRef.current,
							setInNew: customizationItem.miniature.setIsNew
						} : undefined}
					/>
				</div>}

				{!!customizationItem.miniature && <div className='flex h-full w-[10%] items-center justify-center relative'>
					<>
						<img
							src={`/${customizationItem.miniature.src}`}
							alt='miniature-img'
							className={cn('rounded-[1.5625rem] invisible opacity-0 absolute', {
								'visible opacity-100': customizationItem.miniature.src && !customizationItem.miniature.isNew,
							})}
						/>
						<canvas
							ref={miniatureRef}
							className={cn('w-full h-full rounded-[1.5625rem] visible opacity-100 absolute', {
								'invisible opacity-0': customizationItem.miniature.src && !customizationItem.miniature.isNew,
							})
							}
						></canvas>
					</>
				</div>}
			</div>

			{
				isNew ? (
					<div className='w-[7.1875rem]'>
						<button
							onClick={create}
							className='h-[2.3125rem] w-full bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
						>
							Добавить
						</button>
						{!!customizationItem.miniature && <button
							onClick={() => setIsMiniatureModalVisible(true)}
							className='mb-1 h-[1.875rem] w-full bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80 mt-2'
						>
							Миниатюра
						</button>}
					</div>
				) : (
					<div className='w-[7.1875rem]'>
						<button
							onClick={update}
							className='w-full h-[1.875rem] bg-primary hover:bg-primaryHover text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80 mb-2'
						>
							Обновить
						</button>
						{!!customizationItem.miniature && <button
							onClick={() => setIsMiniatureModalVisible(true)}
							className='h-[1.875rem] w-full bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80 mb-2'
						>
							Миниатюра
						</button>}
						<button
							onClick={remove}
							className='w-full h-[1.875rem] bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80'
						>
							Удалить
						</button>
					</div>
				)
			}
		</div>
	)
}

export default CusomizationItem
