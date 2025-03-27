import axios from 'axios'
import $api from '@/http'
import { IStory, IStoryGeneral } from '@/types/story.interface'

class StoryService {
  private URL = `/api/story`

  async create(story: FormData) {
    return $api.post(this.URL, story)
  }

  async getAll() {
    return axios.get<IStory[]>(this.URL)
  }

  async getAllGeneral() {
    return axios.get<IStoryGeneral[]>(`${this.URL}/general`)
  }

  async getOne(id: string) {
    return axios.get<IStory>(`${this.URL}/${id}`)
  }

  async update(id: string | null, story: FormData) {
    if (!id) return
    return $api.put(`${this.URL}/${id}`, story)
  }

  async remove(id: string | null) {
    if (!id) return
    return $api.delete(`${this.URL}/${id}`)
  }
}

export default new StoryService()
