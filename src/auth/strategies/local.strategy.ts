import {Strategy} from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import {AuthService} from '../auth.service'
import UserEntity from 'src/user/entity/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'})
  }

  async validate(username: string, password: string): Promise<Partial<UserEntity>> {
    return this.authService.validateUser(username, password)
  }
}
