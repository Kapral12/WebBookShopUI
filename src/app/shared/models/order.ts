export interface OrderToCreate{
  contactName: string
  contactEmail: string
  contactPhone: string
  address: string
  basketId: string
  deviveryId: number
}

export interface Order {
  id: number
  uploadedInfo: string
  updatedInfo: string
  contactName: string
  contactEmail: string
  contactPhone: string
  address: string
  sum: number
  deliveryId: number
  delivery: Delivery
  orderStatus: OrderStatus
  orderItem: OrderItem[]
  appUserId: string
}

export interface Delivery {
  id: number
  name: string
  description: string
  price: number
}

export interface OrderStatus {
  id: number
  name: string
}

export interface OrderItem {
  amount: number
  price: number
  bookId: number
  orderId: number
  book: Book
}

export interface Book {
  title: string
  imageURL: string
}
