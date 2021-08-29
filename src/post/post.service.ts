import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreatePostDto} from './dto/create-post.dto'
import {UpdatePostDto} from './dto/update-post.dto'
import {Post} from './entities/post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOne(createPostDto.userId)
    const newPostEntity = new Post()
    newPostEntity.title = createPostDto.title
    newPostEntity.content = createPostDto.content
    newPostEntity.user = user
    const newPost = this.postRepository.create(newPostEntity)
    return this.postRepository.save(newPost)
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  async find(id: string): Promise<Post | NotFoundException> {
    const post = await this.postRepository.findOne(id)
    if (post) {
      return post
    }
    throw new NotFoundException()
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    return this.postRepository.update(id, updatePostDto)
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.postRepository.delete(id)
  }
}
