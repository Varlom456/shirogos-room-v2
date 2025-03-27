import $api from '@/http'
import { IFrame } from '@/types/frame.interface'
import axios from 'axios'

class FrameService {
  private URL = `/api/frame`

  async getAll() {
    return axios.get<IFrame[]>(`${this.URL}`)
  }

  async getUnique() {
    return axios.get<IFrame[]>(`${this.URL}/unique`)
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

export default new FrameService()
