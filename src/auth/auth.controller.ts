import {Body, Controller, HttpCode, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginUserDto} from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(loginUserDto)
  }
}
