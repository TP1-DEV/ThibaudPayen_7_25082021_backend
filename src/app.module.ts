import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserModule} from './user/user.module'
import {PostModule} from './post/post.module'
import {AuthModule} from './auth/auth.module'
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'
import {CommentModule} from './comment/comment.module'
import {JwtAuthGuard} from './auth/guards/jwt-auth.guard'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    UserModule,
    PostModule,
    AuthModule,
    CommentModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
