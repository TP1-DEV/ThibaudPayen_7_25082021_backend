import {IsNotEmpty, IsString} from 'class-validator'
import {Post} from 'src/post/entities/post.entity'
import {User} from 'src/user/entities/user.entity'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string

  @IsString()
  @IsNotEmpty()
  body: CreateCommentDto

  @IsNotEmpty()
  user: User

  @IsNotEmpty()
  post: Post
}
