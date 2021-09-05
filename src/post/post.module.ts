import {Module} from '@nestjs/common'
import {PostService} from './post.service'
import {PostController} from './post.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CaslModule} from 'src/casl/casl.module'
import PostEntity from './entity/post.entity'
import UserEntity from 'src/user/entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), CaslModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
