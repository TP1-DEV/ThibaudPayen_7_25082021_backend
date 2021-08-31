import {Req, Controller, HttpCode, Post, UseGuards} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LocalAuthGuard} from './guards/local-auth.guard'
import {RequestWithUser} from './interface/req-user.interface'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user)
  }
}
