import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Connection, createQueryBuilder, DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreatePostDto} from './dto/create-post.dto'
import {UpdatePostDto} from './dto/update-post.dto'
import UserEntity from 'src/user/entity/user.entity'
import PostEntity from './entity/post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private connection: Connection
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const user = await this.userRepository.findOne(createPostDto.user.id)
    if (!user) {
      throw new NotFoundException()
    } else {
      const newPostEntity = new PostEntity()
      newPostEntity.title = createPostDto.body.title
      newPostEntity.content = createPostDto.body.content
      newPostEntity.user = user
      const newPost = this.postRepository.create(newPostEntity)
      return this.postRepository.save(newPost)
    }
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postRepository.find()
  }

  async findById(postId: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne(postId)
    if (!post) {
      throw new NotFoundException()
    }
    return post
  }

  async update(postId: string, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['user']})
    if (!post) {
      throw new NotFoundException()
    } else if (post.user.id !== updatePostDto.user.id && !updatePostDto.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      return this.postRepository.update(postId, updatePostDto.body)
    }
  }

  async delete(postId: string, updatePostDto: UpdatePostDto): Promise<DeleteResult> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['user']})
    if (!post) {
      throw new NotFoundException()
    } else if (post.user.id !== updatePostDto.user.id && !updatePostDto.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      return this.postRepository.delete(postId)
    }
  }

  async getUserLikes(postId: string): Promise<UserEntity[]> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['userLikes']})
    if (!post) {
      throw new NotFoundException()
    } else {
      return post.userLikes
    }
  }

  async likePost(postId: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['userLikes']})
    const userId = updatePostDto.user.id
    const alreadyLiked = await createQueryBuilder(PostEntity, 'post')
      .leftJoinAndSelect('post.userLikes', 'userLikes')
      .where({id: postId})
      .andWhere('userLikes.id = :id', {id: userId})
      .getOne()
    if (!post) {
      throw new NotFoundException()
    } else if (alreadyLiked) {
      post.userLikes.shift()
      return this.connection.manager.save(post)
    } else {
      post.userLikes.push(updatePostDto.user)
      return this.connection.manager.save(post)
    }
  }
}
