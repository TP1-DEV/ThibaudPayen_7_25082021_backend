import {IsNotEmpty, IsString} from 'class-validator'
import UserEntity from 'src/user/entity/user.entity'

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
  user: UserEntity
}
