import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateCommentDto} from './dto/create-comment.dto'
import {UpdateCommentDto} from './dto/update-comment.dto'
import {Comment} from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create(createCommentDto)
    return this.commentRepository.save(newComment)
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find()
  }

  async findOne(id: string): Promise<Comment | NotFoundException> {
    const comment = await this.commentRepository.findOne(id)
    if (comment) {
      return comment
    }
    throw new NotFoundException()
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    return this.commentRepository.update(id, updateCommentDto)
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.commentRepository.delete(id)
  }
}
