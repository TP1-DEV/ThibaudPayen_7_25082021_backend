import {IsString, IsUUID} from 'class-validator'

export class CreatePostDto {
  @IsUUID()
  userId: string

  @IsString()
  title: string

  @IsString()
  content: string
}
