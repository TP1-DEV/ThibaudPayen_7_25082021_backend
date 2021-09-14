import {IsNotEmpty} from 'class-validator'
import UserEntity from 'src/user/entity/user.entity'

interface bodyPostInterface {
  title: string
  content: string
}

export class CreatePostDto {
  file: Express.Multer.File

  @IsNotEmpty()
  user: UserEntity

  @IsNotEmpty()
  body: bodyPostInterface
}
