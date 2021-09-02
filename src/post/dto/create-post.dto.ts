import {IsNotEmpty, IsString} from 'class-validator'
import {User} from 'src/user/entities/user.entity'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  body: CreatePostDto

  @IsNotEmpty()
  user: User
}
