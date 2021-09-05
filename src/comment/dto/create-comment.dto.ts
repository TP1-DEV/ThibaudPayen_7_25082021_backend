import {IsNotEmpty, IsString} from 'class-validator'
import PostEntity from 'src/post/entity/post.entity'
import UserEntity from 'src/user/entity/user.entity'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string

  @IsString()
  @IsNotEmpty()
  body: CreateCommentDto

  @IsNotEmpty()
  user: UserEntity

  @IsNotEmpty()
  post: PostEntity
}
