import {IsEmail, IsString, Matches, MaxLength, MinLength} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Mot de passe trop faible !'
  })
  @MinLength(6)
  @MaxLength(20)
  password: string

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string
}
