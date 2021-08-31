import {ForbiddenException, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import {User} from 'src/user/entities/user.entity'
import {Repository} from 'typeorm'
import {LoginUserDto} from './dto/login-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword)
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | ForbiddenException> {
    const user = await this.userRepository.findOne({where: {email: loginUserDto.email}})
    const isValid = await this.comparePassword(loginUserDto.password, user.password)
    if (user && isValid) {
      const {password, ...result} = user
      return user
    } else {
      return new ForbiddenException()
    }
  }
}
