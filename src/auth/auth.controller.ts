import {Req, Controller, HttpCode, Post, UseGuards} from '@nestjs/common'
import {customReq} from 'src/user/interface/user.interface'
import {AuthService} from './auth.service'
import {LocalAuthGuard} from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Req() req: customReq) {
    return this.authService.signIn(req.user)
  }
}
