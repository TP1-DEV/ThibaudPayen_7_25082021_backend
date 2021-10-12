import {TypeOrmModule} from '@nestjs/typeorm'
import {CommentService} from 'src/comment/comment.service'
import {dbConfig} from 'src/test/general.config.test'
import Comment from 'src/comment/entity/comment.entity'
import Post from 'src/post/entity/post.entity'
import User from 'src/user/entity/user.entity'

export const testConfig = {
  imports: [dbConfig, TypeOrmModule.forFeature([Post, User, Comment])],
  providers: [CommentService]
}
