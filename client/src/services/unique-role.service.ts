import $api from '@/http'
import {
  ICreateUniqueRole,
  IUniqueRole,
  IUpdateUniqueRole,
  UniqueRoleType
} from '@/types/unique-role.interface'
import axios from 'axios'

class UniqueRoleService {
  private URL = `/api/uniqueRole`

  async getAll(type: UniqueRoleType) {
    return axios.get<IUniqueRole[]>(`${this.URL}?type=${type}`)
  }

  async getUnique(type: UniqueRoleType) {
    return axios.get<IUniqueRole[]>(`${this.URL}/unique?type=${type}`)
  }

  async create(data: ICreateUniqueRole, type: UniqueRoleType) {
    return $api.post(`${this.URL}?type=${type}`, data)
  }

  async update(id: number | null, data: IUpdateUniqueRole) {
    if (!id) return
    return $api.put(`${this.URL}/${id}`, data)
  }

  async delete(id: number | null) {
    if (!id) return
    return $api.delete(`${this.URL}/${id}`)
  }
}

export default new UniqueRoleService()
