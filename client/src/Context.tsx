import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react'
import { IUser } from './types/user.interface'
import { useRoomAppearance } from './api/useRoomAppearance'
import { IRoomAppearance } from './types/room.interface'
import { RoomColor } from './consts/roomColors'
import { IBackground } from './types/background.interface'
import userService from './services/user.service'
import axios from 'axios'
import roomService from './services/room.service'

interface IUserForContext extends Omit<IUser, 'Room'> {}

interface IUserContext {
  user: IUserForContext | null
  setUser: React.Dispatch<React.SetStateAction<IUserForContext | null>>
  isRoomCreated: boolean
  setIsRoomCreated: React.Dispatch<React.SetStateAction<boolean>>
  isFetched: boolean
  setIsFetched: React.Dispatch<React.SetStateAction<boolean>>
  logout: () => Promise<void>
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
  selected_background: null
})

const Context: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUserForContext | null>(null)
  const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false)
  const [roomAppearance, setRoomAppearance] = useState<IRoomAppearance | null>(null)
  const [isUserFetched, setIsUserFetched] = useState<boolean>(false)

  const { data: roomAppearanceData, isFetching: isFetchingRoomAppearance } = useRoomAppearance(
    isUserFetched && !!user
  )

  const checkAuth = async () => {
    try {
      const response = await userService.refresh()
      const userData = response.data
      localStorage.setItem('token', userData.accessToken)
      setUser({
        id: userData.user.id,
        username: userData.user.username,
        role: userData.user.role,
        twitch: {
          displayName: userData.user.twitch.displayName
        }
      })
      const isRoomCreatedRes = await roomService.isCreated()
      setIsRoomCreated(isRoomCreatedRes.data)
    } catch (e) {
      localStorage.removeItem('token')
      setUser(null)
      console.log(e)
    } finally {
      setIsUserFetched(true)
    }
  }

  const logout = async () => {
    await axios
      .get(`/api/user/logout`, {
        withCredentials: true
      })
      .then(() => {
        setUser(null)
        localStorage.removeItem('token')
        setIsRoomCreated(false)
      })
      .catch((e) => console.log(e))
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
        logout,
        isRoomCreated,
        setIsRoomCreated
      }}
    >
      <RoomAppearanceContext.Provider
        value={{
          active_room_color: roomAppearance?.active_room_color ?? 'pink',
          active_username_color: roomAppearance?.active_username_color ?? 'pink',
          selected_background: roomAppearance?.selected_background ?? null
        }}
      >
        {children}
      </RoomAppearanceContext.Provider>
    </UserContext.Provider>
  )
}

export default Context
