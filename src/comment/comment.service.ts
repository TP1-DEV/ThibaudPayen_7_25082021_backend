import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateCommentDto} from './dto/create-comment.dto'
import {UpdateCommentDto} from './dto/update-comment.dto'
import PostEntity from 'src/post/entity/post.entity'
import UserEntity from 'src/user/entity/user.entity'
import CommentEntity from './entity/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>
  ) {}

  async create(id: string, createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    const user = await this.userRepository.findOne(createCommentDto.user.id)
    const post = await this.postRepository.findOne(id)
    if (!user || !post) {
      throw new NotFoundException()
    } else {
      const newCommentEntity = new CommentEntity()
      newCommentEntity.comment = createCommentDto.body.comment
      newCommentEntity.user = user
      newCommentEntity.post = post
      const newComment = this.commentRepository.create(newCommentEntity)
      return this.commentRepository.save(newComment)
    }
  }

  async findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find()
  }

  async findById(commentId: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(commentId)
    if (!comment) {
      throw new NotFoundException()
    }
    return comment
  }

  async update(commentId: string, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    const comment = await this.commentRepository.findOne({where: {id: commentId}, relations: ['user']})
    if (!comment) {
      throw new NotFoundException()
    } else if (comment.user.id !== updateCommentDto.user.id && !updateCommentDto.user.isAdmin) {
      return this.commentRepository.update(commentId, updateCommentDto.body)
    }
  }

  async delete(commentId: string, updateCommentDto: UpdateCommentDto): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOne({where: {id: commentId}, relations: ['user']})
    if (!comment) {
      throw new NotFoundException()
    } else if (comment.user.id !== updateCommentDto.user.id && !updateCommentDto.user.isAdmin) {
      return this.commentRepository.delete(commentId)
    }
  }
}
