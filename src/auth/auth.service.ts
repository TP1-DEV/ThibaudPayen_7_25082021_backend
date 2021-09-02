import {ForbiddenException, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import {User} from 'src/user/entities/user.entity'
import {Repository} from 'typeorm'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword)
  }

  async validateUser(email: string, password: string): Promise<string | ForbiddenException> {
    const user = await this.userRepository.findOne({where: {email: email}})
    const isValid = await this.comparePassword(password, user.password)
    if (user && isValid) {
      const userId = user.id
      return userId
    } else {
      return new ForbiddenException()
    }
  }

  async login(userId: string) {
    const payload = userId
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
