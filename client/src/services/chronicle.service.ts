import $api from '@/http'
import {
  IChronicle,
  IChronicleCount,
  IChronicleWithEvents,
  ICreateChronicle
} from '@/types/chronicle.interface'
import axios from 'axios'

class DonateService {
  private URL = `/api/chronicle`

  async getAll() {
    return axios.get<IChronicle[]>(this.URL)
  }

  async getOne(skip: number) {
    return axios.get<IChronicleWithEvents>(`${this.URL}/getOne?skip=${skip}`)
  }

  async getCount() {
    return axios.get<IChronicleCount>(`${this.URL}/count`)
  }

  async create({ year, month }: ICreateChronicle) {
    return $api.post<any, any, ICreateChronicle>(this.URL, {
      year,
      month
    })
  }

  async delete(id: number) {
    return $api.delete(`${this.URL}/${id}`)
  }

  async getEvents(id: number | null) {
    return axios.get<IChronicleWithEvents>(`${this.URL}/${id}`)
  }

  async createEvent(id: number, event: FormData) {
    return $api.post(`${this.URL}/${id}`, event)
  }

  async deleteEvent(id: number) {
    return $api.delete(`${this.URL}/event/${id}`)
  }
}

export default new DonateService()
