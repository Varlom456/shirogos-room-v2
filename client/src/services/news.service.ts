import $api from '@/http'
import { INews, INewsCount } from '@/types/news.interface'
import axios from 'axios'

class NewsService {
  private URL = `/api/news`

  async getOne(skip: number) {
    return axios.get<INews>(`${this.URL}?skip=${skip}`)
  }

  async getCount() {
    return axios.get<INewsCount>(`${this.URL}/count`)
  }

  async create(news: FormData) {
    return $api.post(`${this.URL}`, news)
  }
}

export default new NewsService()
