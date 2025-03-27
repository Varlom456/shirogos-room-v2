import $api from '@/http'
import { IBadge, IBadgeType } from '@/types/badge.interface'
import axios from 'axios'

class BadgeService {
  private URL = `/api/badge`

  async getAll() {
    return axios.get<IBadge[]>(`${this.URL}`)
  }

  async getUnique() {
    return axios.get<IBadge[]>(`${this.URL}/unique`)
  }

  async getTypes() {
    return axios.get<IBadgeType[]>(`${this.URL}/type`)
  }

  async create(data: FormData) {
    return $api.post(`${this.URL}`, data)
  }

  async update(id: number | null, data: FormData) {
    if (!id) return
    return $api.put(`${this.URL}/${id}`, data)
  }

  async delete(id: number | null) {
    if (!id) {
      return
    }

    return $api.delete(`${this.URL}/${id}`)
  }
}

export default new BadgeService()
