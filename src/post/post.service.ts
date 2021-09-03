import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from 'src/user/entities/user.entity'
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
    const user = await this.userRepository.findOne(createPostDto.user.id)
    if (!user) {
      throw new NotFoundException()
    } else {
      const newPostEntity = new Post()
      newPostEntity.title = createPostDto.body.title
      newPostEntity.content = createPostDto.body.content
      newPostEntity.user = user
      const newPost = this.postRepository.create(newPostEntity)
      return this.postRepository.save(newPost)
    }
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne(id)
    if (!post) {
      throw new NotFoundException()
    }
    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    const post = await this.postRepository.findOne({relations: ['user'], where: {id}})
    if (!post) {
      throw new NotFoundException()
    } else if (post.user.id !== updatePostDto.user.id) {
      throw new ForbiddenException()
    } else {
      return this.postRepository.update(id, updatePostDto.body)
    }
  }

  async delete(id: string, updatePostDto: UpdatePostDto): Promise<DeleteResult> {
    const post = await this.postRepository.findOne({relations: ['user'], where: {id}})
    if (!post) {
      throw new NotFoundException()
    } else if (post.user.id !== updatePostDto.user.id) {
      throw new ForbiddenException()
    } else {
      return this.postRepository.delete(id)
    }
  }
}
