import $api from '@/http'
import { IUserNotifications } from '@/types/notifications.interface'

class NotificationService {
  private URL = `/api/notification`

  async getUserNotifications() {
    return $api.get<IUserNotifications>(`${this.URL}`)
  }

  async create(data: FormData) {
    return $api.post(`${this.URL}`, data)
  }

  async read(notificationId: number) {
    return $api.patch(`${this.URL}/read/${notificationId}`)
  }
}

export default new NotificationService()
