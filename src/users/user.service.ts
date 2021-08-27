import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {AuthService} from 'src/auth/auth.service'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<void | ConflictException> {
    const newUser = this.userRepository.create({
      ...createUserDto
    })
    newUser.password = await this.authService.hashPassword(newUser.password)
    try {
      await this.userRepository.save(newUser)
    } catch (error) {
      return new ConflictException(error)
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<void | NotFoundException | ForbiddenException | InternalServerErrorException> {
    try {
      const user = await this.userRepository.findOne({where: {email: loginUserDto.email}})
      if (!user) {
        return new NotFoundException()
      } else {
        const isValid = await this.authService.comparePassword(loginUserDto.password, user.password)       
        if (!isValid) {        
          return new ForbiddenException()
        }
      }
    } catch (error) {    
      return new InternalServerErrorException(error)
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async find(id: string): Promise<User | NotFoundException> {
    const user = await this.userRepository.findOne(id)
    if (user) {
      return user
    }
    throw new NotFoundException()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto)
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
}
