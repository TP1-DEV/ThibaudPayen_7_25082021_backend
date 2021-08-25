import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {User} from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async find(id: string): Promise<User | NotFoundException> {
    const user = await this.userRepository.findOne(id)
    if (user) {
      return user
    }
    throw new NotFoundException()
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
}
