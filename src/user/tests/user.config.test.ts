import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from 'src/auth/auth.service'
import {UserService} from 'src/user/user.service'
import {dbConfig} from 'src/test/general.config.test'
import User from 'src/user/entity/user.entity'

export const testConfig = {
  imports: [dbConfig, TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: AuthService,
      useValue: {
        hashPassword: () => {
          return 'dlkfdsjlkfdsqjlk'
        }
      }
    }
  ]
}
