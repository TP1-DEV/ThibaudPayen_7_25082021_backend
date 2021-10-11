import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Connection, createQueryBuilder, DeleteResult, Repository, UpdateResult} from 'typeorm'
import {customReq} from 'src/user/interface/user.interface'
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

  async create(req: customReq, createPostDto: CreatePostDto, file: Express.Multer.File): Promise<PostEntity> {
    const user = await this.userRepository.findOne(req.user.id)
    const newPostEntity = new PostEntity()
    if (!user) {
      throw new NotFoundException()
    } else if (file) {
      const userFile = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      newPostEntity.file = userFile
    }
    newPostEntity.title = createPostDto.title
    newPostEntity.content = createPostDto.content
    newPostEntity.user = user
    const newPost = this.postRepository.create(newPostEntity)
    return this.postRepository.save(newPost)
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postRepository.find({relations: ['user']})
  }

  async findById(postId: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne(postId)
    if (!post) {
      throw new NotFoundException()
    }
    return post
  }

  async update(postId: string, req: customReq, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['user']})
    if (!post) {
      throw new NotFoundException()
    } else if (post.user.id !== req.user.id && !req.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      return this.postRepository.update(postId, updatePostDto)
    }
  }

  async delete(postId: string, req: customReq): Promise<DeleteResult> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['user']})
    if (!post) {
      throw new NotFoundException()
    } else if (post.user.id !== req.user.id && !req.user.isAdmin) {
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

  async likePost(postId: string, req: customReq): Promise<PostEntity> {
    const post = await this.postRepository.findOne({where: {id: postId}, relations: ['userLikes']})
    const userId = req.user.id
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
      post.userLikes.push(req.user)
      return this.connection.manager.save(post)
    }
  }
}
