import {Module} from '@nestjs/common'
import {UserService} from './user.service'
import {UserController} from './user.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from 'src/auth/auth.module'
import {User} from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
