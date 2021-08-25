import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreatePostDto} from './dto/create-post.dto'
import {UpdatePostDto} from './dto/update-post.dto'
import {Post} from './entities/post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(createPostDto)
    return this.postRepository.save(newPost)
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find()
  }

  async find(id: string): Promise<Post | NotFoundException> {
    const post = await this.postRepository.findOne(id)
    if (post) {
      return post
    }
    throw new NotFoundException()
  }

  update(id: string, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    return this.postRepository.update(id, updatePostDto)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.postRepository.delete(id)
  }
}
