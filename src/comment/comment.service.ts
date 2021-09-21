import {Injectable, NotFoundException, ForbiddenException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {DeleteResult, Repository, UpdateResult} from 'typeorm'
import {CreateCommentDto} from './dto/create-comment.dto'
import {UpdateCommentDto} from './dto/update-comment.dto'
import {customReq} from 'src/user/interface/user.interface'
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

  async create(id: string, req: customReq, createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    const user = await this.userRepository.findOne(req.user.id)
    const post = await this.postRepository.findOne(id)
    if (!user || !post) {
      throw new NotFoundException()
    } else {
      const newCommentEntity = new CommentEntity()
      newCommentEntity.comment = createCommentDto.comment
      newCommentEntity.user = user
      newCommentEntity.post = post
      const newComment = this.commentRepository.create(newCommentEntity)
      return this.commentRepository.save(newComment)
    }
  }

  async findByPost(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.find({where: {post: {id: postId}}, relations: ['post']})
  }

  async findById(commentId: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne(commentId)
    if (!comment) {
      throw new NotFoundException()
    }
    return comment
  }

  async update(commentId: string, req: customReq, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    const comment = await this.commentRepository.findOne({where: {id: commentId}, relations: ['user']})
    if (!comment) {
      throw new NotFoundException()
    } else if (comment.user.id !== req.user.id && !req.user.isAdmin) {
      return this.commentRepository.update(commentId, updateCommentDto)
    }
  }

  async delete(commentId: string, req: customReq): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOne({where: {id: commentId}, relations: ['user']})
    if (!comment) {
      throw new NotFoundException()
    } else if (comment.user.id !== req.user.id && !req.user.isAdmin) {
      throw new ForbiddenException()
    } else {
      return this.commentRepository.delete(commentId)
    }
  }
}
