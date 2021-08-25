import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserModule} from './users/user.module'
import {PostModule} from './posts/post.module'

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PostModule]
})
export class AppModule {}
