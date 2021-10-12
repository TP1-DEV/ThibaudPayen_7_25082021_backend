import {TypeOrmModule} from '@nestjs/typeorm'
import {PostService} from 'src/post/post.service'
import {dbConfig} from 'src/test/general.config.test'
import Post from 'src/post/entity/post.entity'
import User from 'src/user/entity/user.entity'

export const testConfig = {
  imports: [dbConfig, TypeOrmModule.forFeature([Post, User])],
  providers: [PostService]
}
