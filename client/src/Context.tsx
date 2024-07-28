import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { IUser } from './types/user.interface'
import { useRoomAppearance } from './api/useRoomAppearance'
import { IRoomAppearance } from './types/room.interface'
import { RoomColor } from './consts/roomColors'
import { IBackground } from './types/background.interface'
import userService from './services/user.service'

interface IUserContext {
	user: IUser | null
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
	isFetched: boolean
	setIsFetched: React.Dispatch<React.SetStateAction<boolean>>
}

interface IRoomAppearanceContext {
	active_room_color: RoomColor
	active_username_color: RoomColor
	selected_background: IBackground | null
}

export const UserContext = createContext<IUserContext | null>(null)
export const RoomAppearanceContext = createContext<IRoomAppearanceContext>({
	active_room_color: 'pink',
	active_username_color: 'pink',
	selected_background: null,
})

const Context: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [roomAppearance, setRoomAppearance] = useState<IRoomAppearance | null>(
		null
	)
	const [isUserFetched, setIsUserFetched] = useState<boolean>(false)

	const { data: roomAppearanceData, isFetching: isFetchingRoomAppearance } =
		useRoomAppearance(isUserFetched && !!user)

	const checkAuth = async () => {
		try {
			const response = await userService.refresh()
			const userData = response.data
			localStorage.setItem('token', userData.accessToken)
			setUser({
				id: userData.user.id,
				username: userData.user.username,
				role: userData.user.role,
				Room: userData.user.Room
					? {
							id: userData.user.Room.id,
					  }
					: null,
				twitch: {
					displayName: userData.user.twitch.displayName,
				},
			})
		} catch (e) {
			localStorage.removeItem('token')
			setUser(null)
			console.log(e)
		} finally {
			setIsUserFetched(true)
		}
	}

	const setUserActiveColors = () => {
		if (roomAppearanceData) {
			setRoomAppearance(roomAppearanceData)
		}
	}

	useEffect(() => {
		if (!isFetchingRoomAppearance && isUserFetched) {
			setUserActiveColors()
		}
	}, [isFetchingRoomAppearance, isUserFetched])

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isFetched: isUserFetched,
				setIsFetched: setIsUserFetched,
			}}
		>
			<RoomAppearanceContext.Provider
				value={{
					active_room_color: roomAppearance?.active_room_color ?? 'pink',
					active_username_color:
						roomAppearance?.active_username_color ?? 'pink',
					selected_background: roomAppearance?.selected_background ?? null,
				}}
			>
				{children}
			</RoomAppearanceContext.Provider>
		</UserContext.Provider>
	)
}

export default Context
