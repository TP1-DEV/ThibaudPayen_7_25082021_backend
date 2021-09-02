import {User} from 'src/user/entities/user.entity'

export interface TokenPayload {
  user: Partial<User>
}
