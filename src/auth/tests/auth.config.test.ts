import {JwtService} from '@nestjs/jwt'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from 'src/auth/auth.service'
import {dbConfig} from 'src/test/general.config.test'
import User from 'src/user/entity/user.entity'

export const testConfig = {
  imports: [dbConfig, TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    {
      provide: JwtService,
      useValue: {
        sign: () => {
          return 'thetoken'
        }
      }
    }
  ]
}
