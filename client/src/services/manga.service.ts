import $api from '@/http'
import { IManga, IMangaGeneral, IMangaReader } from '@/types/manga.interface'
import axios from 'axios'

class MangaService {
  private URL = `/api/manga`

  async create(manga: FormData) {
    return $api.post(this.URL, manga)
  }

  async getAllWithChapters() {
    return axios.get<IManga[]>(`${this.URL}/chapters`)
  }

  async getAll() {
    return axios.get<IMangaGeneral[]>(this.URL)
  }

  async getOne(id: string, chapter: number) {
    return axios.get<IMangaReader>(`${this.URL}/${id}/${chapter}`)
  }

  async addChapter(id: string, manga: FormData) {
    return $api.post(`${this.URL}/${id}/chapter`, manga)
  }

  async update(id: string, manga: FormData) {
    return $api.patch(`${this.URL}/${id}`, manga)
  }

  async remove(id: number | null) {
    if (!id) return
    return $api.delete(`${this.URL}/${id}`)
  }
}

export default new MangaService()
