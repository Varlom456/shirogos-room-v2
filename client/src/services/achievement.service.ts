import $api from '@/http'
import { IAchievementFetch, IAchievementFetchWithAward } from '@/types/achievements.interface'
import axios from 'axios'

class AchievementService {
  private URL = `/api/achievement`

  async getAll() {
    return await axios.get<IAchievementFetchWithAward[]>(`${this.URL}/all`)
  }

  async create(achieve: FormData) {
    return await $api.post(`${this.URL}`, achieve)
  }

  async update(id: number | null, achieve: FormData) {
    if (!id) return
    return await $api.put(`${this.URL}/${id}`, achieve)
  }

  async remove(id: number | null) {
    if (!id) return
    return await $api.delete(`${this.URL}/${id}`)
  }

  async getByTwitchLogin(twitchLogin: string) {
    return await axios.get<IAchievementFetch[]>(`${this.URL}/${twitchLogin}`)
  }
}

export default new AchievementService()
