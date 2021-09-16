import {ForbiddenException, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import UserEntity from 'src/user/entity/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword)
  }

  async validateUser(email: string, pwd: string): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOne({where: {email: email}})
    if (!user) {
      throw new ForbiddenException()
    } else {
      const isValid = await this.comparePassword(pwd, user.password)
      if (!isValid) {
        throw new ForbiddenException()
      } else {
        const {password, ...result} = user
        return result
      }
    }
  }

  async signIn(user: Partial<UserEntity>) {
    return {
      user: user,
      token: this.jwtService.sign(user)
    }
  }
}
