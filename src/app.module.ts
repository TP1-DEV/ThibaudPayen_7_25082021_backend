import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserModule} from './users/user.module'
import {PostModule} from './posts/post.module'
import {AuthModule} from './auth/auth.module'
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    UserModule,
    PostModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
