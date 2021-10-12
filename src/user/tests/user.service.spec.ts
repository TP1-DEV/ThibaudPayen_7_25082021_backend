import {ExecutionContext} from '@nestjs/common'
import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {CreateUserDto} from 'src/user/dto/create-user.dto'
import {UpdateUserDto} from 'src/user/dto/update-user.dto'
import {customReq} from 'src/user/interface/user.interface'
import {testConfig} from 'src/user/tests/user.config.test'
import {loadFixtures} from 'src/test/general.config.test'
import {Connection, Repository} from 'typeorm'
import {UserService} from '../user.service'
import Post from 'src/post/entity/post.entity'
import User from 'src/user/entity/user.entity'

describe('UserService', () => {
  let service: UserService
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule(testConfig)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest()
          req.user = ''
          return true
        }
      })
      .compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should create a user', async () => {
    const userDto = {
      email: 'john@doe.com',
      password: 'complexPa55word!',
      firstname: 'John',
      lastname: 'Doe'
    } as CreateUserDto

    await service.signUp(userDto)
    const repository: Repository<User> = module.get(getRepositoryToken(User))

    const user = await repository.findOne({where: {email: 'John@doe.com'}})
    expect(user).not.toBeNull()
  })
  it('should return 1 user', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const users = await service.findAll()
    expect(users.length).toEqual(1)
  })

  it('should return 1 user', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const repository: Repository<User> = module.get(getRepositoryToken(User))
    const builtInUser: User = await repository.findOne({where: {email: 'john@doe.com'}})
    const user = await service.findById(builtInUser.id)
    expect(user).not.toBeNull()
  })

  it('should return 1 user', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const repository: Repository<User> = module.get(getRepositoryToken(User))
    const builtInUser: User = await repository.findOne({where: {email: 'john@doe.com'}})
    const user = await service.findById(builtInUser.id)
    expect(user).not.toBeNull()
  })

  it('should update 1 user', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const repository: Repository<User> = module.get(getRepositoryToken(User))
    const builtInUser: User = await repository.findOne({where: {email: 'john@doe.com'}})
    const updatedUser = {
      firstname: 'Regis'
    } as UpdateUserDto
    const user = await service.update(builtInUser.id, {user: {id: builtInUser.id} as User} as customReq, updatedUser)
    expect(user.firstname).toEqual('Regis')
  })

  it('should delete 1 user', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const repository: Repository<User> = module.get(getRepositoryToken(User))
    const builtInUser: User = await repository.findOne({where: {email: 'john@doe.com'}})

    await service.delete(builtInUser.id, {user: {id: builtInUser.id} as User} as customReq)
    const users: User[] = await repository.find()
    expect(users.length).toEqual(0)
  })
  it('should get 1 one post like', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const repository: Repository<User> = module.get(getRepositoryToken(User))
    const builtInUser: User = await repository.findOne({where: {email: 'john@doe.com'}})

    const post: Post[] = await service.getUserLikes(builtInUser.id)
    expect(post.length).toEqual(1)
  })

  afterEach(async () => {
    await module.close()
  })
})
