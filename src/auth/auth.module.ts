import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from 'src/user/entities/user.entity'
import {PassportModule} from '@nestjs/passport'
import {LocalStrategy} from './strategies/local.strategy'
/* import {JwtModule} from '@nestjs/jwt' */

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    /* JwtModule.register({
      secret: 'MySecretPass',
      signOptions: {expiresIn: '10h'}
    }) */
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
