import {IsNotEmpty, IsString} from 'class-validator'
import UserEntity from 'src/user/entity/user.entity'

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  user: UserEntity
}
