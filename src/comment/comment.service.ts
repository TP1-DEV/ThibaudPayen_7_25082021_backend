import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Post} from 'src/post/entities/post.entity'
import {User} from 'src/user/entities/user.entity'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateCommentDto} from './dto/create-comment.dto'
import {UpdateCommentDto} from './dto/update-comment.dto'
import {Comment} from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async create(id: string, createCommentDto: CreateCommentDto): Promise<Comment | NotFoundException> {
    const user = await this.userRepository.findOne(createCommentDto.user.id)
    const post = await this.postRepository.findOne(id)
    if (!user && !post) {
      throw new NotFoundException()
    } else {
      const newCommentEntity = new Comment()
      newCommentEntity.comment = createCommentDto.body.comment
      newCommentEntity.user = user
      newCommentEntity.post = post
      const newComment = this.commentRepository.create(newCommentEntity)
      return this.commentRepository.save(newComment)
    }
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find()
  }

  async findById(id: string): Promise<Comment | NotFoundException> {
    const comment = await this.commentRepository.findOne(id)
    if (!comment) {
      throw new NotFoundException()
    }
    return comment
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<UpdateResult | NotFoundException> {
    const comment = await this.commentRepository.findOne(id)
    if (!comment) {
      throw new NotFoundException()
    }
    return this.commentRepository.update(id, updateCommentDto)
  }

  async delete(id: string): Promise<DeleteResult | NotFoundException> {
    const comment = await this.commentRepository.findOne(id)
    if (!comment) {
      throw new NotFoundException()
    }
    return this.commentRepository.delete(id)
  }
}
