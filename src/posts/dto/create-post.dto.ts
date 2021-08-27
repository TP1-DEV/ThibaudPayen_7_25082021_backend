import { IsString, IsUUID } from "class-validator"

export class CreatePostDto {
  @IsUUID()
  UserId: string

  @IsString()
  title: string

  @IsString()
  content: string
}
