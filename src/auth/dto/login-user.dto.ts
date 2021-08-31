import {IsNotEmpty, IsString} from 'class-validator'
import {User} from 'src/user/entities/user.entity'

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  user: User
}
