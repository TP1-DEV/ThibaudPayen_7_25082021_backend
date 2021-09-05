import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {PassportModule} from '@nestjs/passport'
import {LocalStrategy} from './strategies/local.strategy'
import {JwtModule} from '@nestjs/jwt'
import {JwtStrategy} from './strategies/jwt-strategy'
import UserEntity from 'src/user/entity/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {expiresIn: '24h'}
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
