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

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({where: {email: email}})
    const isValid = await this.comparePassword(password, user.password)
    if (user && isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password, ...userId} = user
      return userId
    } else {
      throw new ForbiddenException()
    }
  }

  async login(user: Partial<User>) {
    const payload = user
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
