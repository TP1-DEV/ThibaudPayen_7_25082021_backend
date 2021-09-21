import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {AuthService} from 'src/auth/auth.service'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {customReq} from './interface/user.interface'
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

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const newUser = this.userRepository.create({
      ...createUserDto
    })
    newUser.password = await this.authService.hashPassword(newUser.password)
    try {
      await this.userRepository.save(newUser)
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

  async update(userId: string, req: customReq, updateUserDto: UpdateUserDto): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException()
    } else if (user.id !== req.user.id && !req.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      const updatedUser = {...user, ...updateUserDto}
      await this.userRepository.update(userId, updatedUser)
      const {password, ...result} = updatedUser
      return result
    }
  }

  async delete(userId: string, req: customReq): Promise<DeleteResult> {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException()
    } else if (user.id !== req.user.id && !req.user.isAdmin) {
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
