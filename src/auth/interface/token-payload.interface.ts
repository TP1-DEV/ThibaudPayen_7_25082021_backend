import UserEntity from 'src/user/entity/user.entity'

export interface TokenPayload {
  user: Partial<UserEntity>
}
