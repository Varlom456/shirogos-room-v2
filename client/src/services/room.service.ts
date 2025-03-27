import {
  IActiveBackground,
  IActiveFrame,
  IBoutiqueBackground,
  IBoutiqueUniqueRoles,
  IBuyRoomColor,
  IBuyRoomPanopticon,
  IBuyUniqueRole,
  IBuyedPanopticon,
  IBuyedRoomBackgrounds,
  IBuyedRoomFrames,
  IChangeRoomColor,
  IChangeRoomName,
  IChangeUniqueRole,
  IChooseActiveRoomBackground,
  IChooseActiveRoomFrame,
  IChooseFavoriteCharacter,
  ICreateRoom,
  IFavoriteCharacter,
  IMakeOrder,
  IRoom,
  IRoomAppearance,
  IRoomCharacters,
  IRoomEditor,
  IRoomPanopticons,
  IStats,
  IUpdateRoomEditor,
  IUserRoomColors,
  IUserUniqueRoles
} from '@/types/room.interface'
import $api from '@/http'
import { IBadge, IBoutiqueBadge } from '@/types/badge.interface'

class RoomContentService {
  private URL = `/api/room`

  async get() {
    return await $api.get<IRoom>(`${this.URL}`)
  }

  async isCreated() {
    return await $api.get<boolean>(`${this.URL}/isCreated`)
  }

  async create({ roomName, username }: ICreateRoom) {
    return await $api.post(`${this.URL}`, {
      roomName,
      username
    })
  }

  async getUserRoomColors() {
    return await $api.get<IUserRoomColors>(`${this.URL}/colors`)
  }

  async getRoomAppearance() {
    return await $api.get<IRoomAppearance>(`${this.URL}/appearance`)
  }

  async changeRoomColor(data: IChangeRoomColor) {
    return await $api.put(`${this.URL}/roomColor`, data)
  }

  async changeUsernameColor(data: IChangeRoomColor) {
    return await $api.put(`${this.URL}/usernameColor`, data)
  }

  async getUserUniqueRoles() {
    return await $api.get<IUserUniqueRoles>(`${this.URL}/uniqueRole`)
  }

  async changeUniqueRole(type: string, data: IChangeUniqueRole) {
    return await $api.put(`${this.URL}/uniqueRole?type=${type}`, data)
  }

  async getRoomCharacters() {
    return await $api.get<IRoomCharacters>(`${this.URL}/character`)
  }

  async chooseFavoriteCharacter(data: IChooseFavoriteCharacter) {
    return await $api.post(`${this.URL}/character`, data)
  }

  async getFavoriteCharacter() {
    return await $api.get<IFavoriteCharacter | null>(`${this.URL}/character/favorite`)
  }

  async getActiveRoomBackground() {
    return await $api.get<IActiveBackground>(`${this.URL}/background/active`)
  }

  async getBuyedRoomBackgrounds() {
    return await $api.get<IBuyedRoomBackgrounds>(`${this.URL}/background`)
  }

  async chooseActiveRoomBackground(data: IChooseActiveRoomBackground) {
    return await $api.put<IActiveBackground>(`${this.URL}/background/active`, data)
  }

  async getActiveRoomFrame() {
    return await $api.get<IActiveFrame>(`${this.URL}/frame/active`)
  }

  async getBuyedRoomFrames() {
    return await $api.get<IBuyedRoomFrames>(`${this.URL}/frame`)
  }

  async chooseActiveRoomFrame(data: IChooseActiveRoomFrame) {
    return await $api.put<IActiveFrame>(`${this.URL}/frame/active`, data)
  }

  async changeRoomName(data: IChangeRoomName) {
    return await $api.put(`${this.URL}/roomName`, data)
  }

  async buyRoomColor(type: string, data: IBuyRoomColor) {
    return await $api.post(`${this.URL}/roomColor?type=${type}`, data)
  }

  async getBoutiqueUniqueRoles() {
    return await $api.get<IBoutiqueUniqueRoles>(`${this.URL}/uniqueRole/boutique`)
  }

  async buyUniqueRole(data: IBuyUniqueRole) {
    return await $api.post(`${this.URL}/uniqueRole`, data)
  }

  async makeOrder(type: string, data: IMakeOrder) {
    return await $api.post(`${this.URL}/order?type=${type}`, data)
  }

  async getRoomPanopticons() {
    return await $api.get<IRoomPanopticons>(`${this.URL}/panopticon`)
  }

  async buyRoomPanopticon(data: IBuyRoomPanopticon) {
    return await $api.post(`${this.URL}/panopticon`, data)
  }

  async getRoomPanopticon(panopticonId: number) {
    return await $api.get<IBuyedPanopticon>(`${this.URL}/panopticon/${panopticonId}`)
  }

  async getBuyedBadges() {
    return await $api.get<IBadge[]>(`${this.URL}/badge`)
  }

  async getBoutiqueBadges() {
    return await $api.get<IBoutiqueBadge>(`${this.URL}/badge/boutique`)
  }

  async buyBoutiqueBadge(badgeId: number) {
    return await $api.post(`${this.URL}/badge/${badgeId}`)
  }

  async getBoutiqueBackgrounds() {
    return await $api.get<IBoutiqueBackground>(`${this.URL}/background/boutique`)
  }

  async buyBoutiqueBackground(bgId: number) {
    return await $api.post(`${this.URL}/background/${bgId}`)
  }

  async getRoomStats() {
    return await $api.get<IStats>(`${this.URL}/stats`)
  }

  async getRoomEditor() {
    return await $api.get<IRoomEditor>(`${this.URL}/editor`)
  }

  async updateEditor(data: IUpdateRoomEditor) {
    return await $api.put(`${this.URL}/editor`, data)
  }
}

export default new RoomContentService()
