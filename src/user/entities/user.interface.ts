import {Post} from 'src/post/entities/post.entity'

export interface User {
  id?: string
  email?: string
  username?: string
  password?: string
  profileImage?: string
  role?: UserRole
  posts?: Post[]
  comments?: Comment[]
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
