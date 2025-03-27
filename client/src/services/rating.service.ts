import { IRatingUser } from '@/types/rating.interface'
import axios from 'axios'

class RatingService {
  private URL = `/api/rating`

  async getThreeBestUsers() {
    return await axios.get<IRatingUser[]>(`${this.URL}/threeBest`)
  }
}

export default new RatingService()
