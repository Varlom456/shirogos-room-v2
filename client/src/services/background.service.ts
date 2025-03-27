import $api from '@/http'
import { IBackground } from '@/types/background.interface'
import axios from 'axios'

class BackgroundService {
  private URL = `/api/background`

  async getAll() {
    return axios.get<IBackground[]>(`${this.URL}`)
  }

  async getUnique() {
    return axios.get<IBackground[]>(`${this.URL}/unique`)
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

export default new BackgroundService()
