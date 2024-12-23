export type User = {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

export type Event = {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  imageUrl?: string | null
  maxSeats?: number | null
  registrations?: any[]
} 