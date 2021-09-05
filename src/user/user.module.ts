import {Module} from '@nestjs/common'
import {UserService} from './user.service'
import {UserController} from './user.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from 'src/auth/auth.module'
import UserEntity from './entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
