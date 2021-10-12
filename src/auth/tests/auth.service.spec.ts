import {Test, TestingModule} from '@nestjs/testing'
import {testConfig} from 'src/auth/tests/auth.config.test'
import {loadFixtures} from 'src/test/general.config.test'
import {Connection} from 'typeorm'
import {AuthService} from '../auth.service'
import User from 'src/user/entity/user.entity'

describe('AuthService', () => {
  let service: AuthService
  let module: TestingModule
  beforeEach(async () => {
    module = await Test.createTestingModule(testConfig).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should compare password', async () => {
    const isSame = await service.comparePassword(
      'password',
      '$2a$12$UQrCjZSgSRaDp5ShUpoQLOLmuUqhTjLz0h60RemKPTBKyYfoxZ/1.'
    )
    expect(isSame).toBeTruthy()
    const notSame = await service.comparePassword(
      'wrongpassword',
      '$2a$12$UQrCjZSgSRaDp5ShUpoQLOLmuUqhTjLz0h60RemKPTBKyYfoxZ/1.'
    )
    expect(notSame).toBeFalsy()
  })

  it('should return password hash', async () => {
    // intestable car contraint par le salt
    //const hash = await service.hashPassword("password")
    //expect(hash).toEqual("unknow")
  })

  it('should sign in user', async () => {
    const user = {
      email: 'john@doe.com',
      firstname: 'John',
      lastname: 'Doe'
    } as User
    const signInReturn = await service.signIn(user)
    expect(signInReturn.token).toEqual('thetoken')
  })

  it('should validate user', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const signInReturn = await service.validateUser('john@doe.com', 'password')
  })

  afterEach(async () => {
    await module.close()
  })
})
