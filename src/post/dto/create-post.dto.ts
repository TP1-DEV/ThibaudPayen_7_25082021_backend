import {IsNotEmpty, IsString} from 'class-validator'
import {Post} from '../entities/post.entity'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  userId: string

  @IsString()
  body: Post
}
