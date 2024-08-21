import RoomNav from '@/components/Room/RoomNav'
import RoomSections from '@/components/Room/RoomSections'
import Header from '@/layout/Header/Header'
import { useContext, useEffect } from 'react'
import Loader from './Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoomAppearanceContext, UserContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { cn } from '@/utils/cn'

const Room = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const userContext = useContext(UserContext)
	const roomAppearance = useContext(RoomAppearanceContext)

	useEffect(() => {
		if (!userContext?.isRoomCreated) {
			navigate('/')
		}
	}, [userContext?.isFetched, userContext?.isRoomCreated])

	return !userContext?.isFetched || !userContext.isRoomCreated ? (
		<Loader />
	) : (
		<>
			<Header isFixed={false} withLine={false} />
			<div
				className={`pt-[0.62rem] min-h-[calc(100vh-5.25rem)] bg-tertiary relative z-10 ${
					colorVariants.text[roomAppearance.active_room_color]
				}`}
			>
				<div
					style={{
						backgroundImage: !!roomAppearance.selected_background
							? `url(${import.meta.env.VITE_SERVER_URL}/${roomAppearance
									.selected_background?.img})`
							: "url('/images/room-default-bg.webp')",
					}}
					className={cn(`w-full h-full absolute inset-0 -z-20`, {
						'bg-cover bg-no-repeat bg-center':
							!!roomAppearance.selected_background,
						'visible opacity-30': !pathname.includes('editor'),
						'invisible opacity-0': pathname.includes('editor'),
					})}
				/>
				<div
					className={cn(
						`w-full h-full ${
							colorVariants.bgRoomGradientBg[roomAppearance.active_room_color]
						} absolute inset-0 -z-10`,
						{
							'visible opacity-100': !pathname.includes('editor'),
							'invisible opacity-0': pathname.includes('editor'),
						}
					)}
				/>

				<RoomNav />
				<RoomSections />
			</div>
		</>
	)
}

export default Room
