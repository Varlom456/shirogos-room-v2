import $api from '@/http'
import { IBirthdayAward, IUpdateBirthadyAward } from '@/types/birthday-award.interface'
import axios from 'axios'

class BirthdayAwardService {
  private URL = `/api/birthdayAward`

  async get() {
    return axios.get<IBirthdayAward>(`${this.URL}`)
  }

  async update({ award }: IUpdateBirthadyAward) {
    return $api.patch(`${this.URL}`, {
      award
    })
  }
}

export default new BirthdayAwardService()
