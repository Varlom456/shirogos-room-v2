import $api from '@/http'
import {
  ICreateDonate,
  IDonate,
  IUpdateDonateAmount,
  IUpdateDonateGifts
} from '@/types/donate.interface'
import axios from 'axios'

class DonateService {
  private URL = `/api/donate`

  async getAll() {
    return axios.get<IDonate[]>(this.URL)
  }

  async create({ username, amount, gifts }: ICreateDonate) {
    return $api.post<any, any, ICreateDonate>(this.URL, {
      username,
      amount,
      gifts
    })
  }

  async updateAmount({ id, addAmount }: IUpdateDonateAmount) {
    return $api.patch(`${this.URL}/updateAmount/${id}`, {
      addAmount
    })
  }

  async updateGifts({ id, gifts }: IUpdateDonateGifts) {
    return $api.patch(`${this.URL}/updateGifts/${id}`, {
      gifts
    })
  }

  async delete(id: number) {
    return $api.delete(`${this.URL}/${id}`)
  }
}

export default new DonateService()
