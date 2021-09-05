import {Module} from '@nestjs/common'
import {CommentService} from './comment.service'
import {CommentController} from './comment.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import CommentEntity from './entity/comment.entity'
import PostEntity from 'src/post/entity/post.entity'
import UserEntity from 'src/user/entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity, UserEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
