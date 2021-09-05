import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
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
    private userRepository: Repository<UserEntity>
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

  async findById(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne(id)
    if (!post) {
      throw new NotFoundException()
    }
    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    const post = await this.postRepository.findOne(id)
    if (!post) {
      throw new NotFoundException()
    } else {
      return this.postRepository.update(id, updatePostDto.body)
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    const post = await this.postRepository.findOne(id)
    if (!post) {
      throw new NotFoundException()
    } else {
      return this.postRepository.delete(id)
    }
  }
}
