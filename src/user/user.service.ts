import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {AuthService} from 'src/auth/auth.service'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | ForbiddenException> {
    const newUser = this.userRepository.create({
      ...createUserDto
    })
    newUser.password = await this.authService.hashPassword(newUser.password)
    try {
      await this.userRepository.save(newUser)
      return newUser
    } catch (error) {
      throw new ForbiddenException()
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findById(id: string): Promise<User | NotFoundException> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult | NotFoundException> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return this.userRepository.update(id, updateUserDto)
  }

  async delete(id: string): Promise<DeleteResult | NotFoundException> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return this.userRepository.delete(id)
  }
}
