import {Post} from 'src/post/entities/post.entity'

export interface User {
  id?: string
  email?: string
  username?: string
  password?: string
  profileImage?: string
  roles?: Role[]
  posts?: Post[]
  comments?: Comment[]
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}
