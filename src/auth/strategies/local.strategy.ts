import {Strategy} from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable, UnauthorizedException} from '@nestjs/common'
import {AuthService} from '../auth.service'
import {User} from 'src/user/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'})
  }

  async validate(username: string, password: string): Promise<Partial<User> | UnauthorizedException> {
    return this.authService.validateUser(username, password)
  }
}
