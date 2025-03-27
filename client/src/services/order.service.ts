import $api from '@/http'
import {
  ICreateOrderManually,
  IFetchedOrderPrice,
  IOrderByTypes,
  IOrderRules,
  IOrderType,
  IUpdateOrderPrice,
  IUpdateOrderRules,
  IUserOrder
} from '@/types/order.interface'
import axios from 'axios'

class OrderService {
  private URL = `/api/order`

  async getOrderTypes() {
    return await axios.get<IOrderType[]>(`${this.URL}/type`)
  }

  async getOrdersByType(type: string) {
    return await axios.get<IOrderByTypes[]>(`${this.URL}/info?type=${type}`)
  }

  async getOrderRulesByType(type: string) {
    return await axios.get<IOrderRules>(`${this.URL}/rules?type=${type}`)
  }

  async getPendingOrders() {
    return await axios.get<IUserOrder[]>(`${this.URL}/pending`)
  }

  async getCompletedOrders() {
    return await axios.get<IUserOrder[]>(`${this.URL}/completed`)
  }

  async getRejectedOrders() {
    return await axios.get<IUserOrder[]>(`${this.URL}/rejected`)
  }

  async updateOrderPrice(id: number, dto: IUpdateOrderPrice) {
    return await $api.put(`${this.URL}/price/${id}`, dto)
  }

  async updateOrderRules(type: string, dto: IUpdateOrderRules) {
    return await $api.put(`${this.URL}/rules/${type}`, dto)
  }

  async getOrderPrices() {
    return await axios.get<IFetchedOrderPrice[]>(`${this.URL}/price`)
  }

  async createOrderManually(dto: ICreateOrderManually) {
    return await $api.post(`${this.URL}/manually`, dto)
  }

  async completeOrder(id: number) {
    return await $api.patch(`${this.URL}/complete/${id}`)
  }

  async rejectOrder(id: number) {
    return await $api.patch(`${this.URL}/reject/${id}`)
  }
}

export default new OrderService()
