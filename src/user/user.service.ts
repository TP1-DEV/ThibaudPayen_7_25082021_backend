import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {AuthService} from 'src/auth/auth.service'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import PostEntity from 'src/post/entity/post.entity'
import UserEntity from './entity/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      ...createUserDto.body
    })
    newUser.password = await this.authService.hashPassword(newUser.password)
    try {
      await this.userRepository.save(newUser)
      return newUser
    } catch (error) {
      throw new ForbiddenException('Email/Username already used !')
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  async findById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException()
    } else if (user.id !== updateUserDto.user.id && !updateUserDto.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      return this.userRepository.update(userId, updateUserDto.body)
    }
  }

  async delete(userId: string, updateUserDto: UpdateUserDto): Promise<DeleteResult> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException()
    } else if (user.id !== updateUserDto.user.id && !updateUserDto.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      return this.userRepository.delete(userId)
    }
  }

  async getUserLikes(userId: string): Promise<PostEntity[]> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['postLikes']})
    if (!user) {
      throw new NotFoundException()
    } else {
      return user.postLikes
    }
  }
}
