import { IAlmanac } from '@/types/almanac.interface'
import axios from 'axios'

class AlmanacService {
  private URL = `/api/almanac`

  async getCurrentBirthdays(date: Date) {
    const currentDateArr = date.toLocaleDateString('en-US').split('/')
    const currentDate = `${currentDateArr[0]}.${currentDateArr[1]}`
    return await axios.get<IAlmanac[]>(`${this.URL}/${currentDate}`)
  }
}

export default new AlmanacService()
