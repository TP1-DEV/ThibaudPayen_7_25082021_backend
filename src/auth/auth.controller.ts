import {Req, Controller, HttpCode, Post, UseGuards} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginUserDto} from './dto/login-user.dto'
import {LocalAuthGuard} from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.userId)
  }
}
