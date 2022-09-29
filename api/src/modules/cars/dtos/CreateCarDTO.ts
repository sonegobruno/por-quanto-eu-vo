export interface ICreateCarDTO {
  name: string
  description: string
  image_url?: string
  image_description?: string
  alcohol_consumption: number
  gas_consumption: number
  user_id: string
}
