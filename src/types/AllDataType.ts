export interface ProductType {
  _id: string
  name: string
  category: string
  price: string
  discount?: string | number
  producttagline: string
  imageUrl: string
  description: string
}

export interface OrderDataType {
  _id: string
  username: string
  email: string
  name: string
  category: string
  price: string
  producttagline: string
  imageUrl: string
  description: string
}

