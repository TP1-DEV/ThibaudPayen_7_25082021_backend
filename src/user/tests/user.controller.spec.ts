import {Test, TestingModule} from '@nestjs/testing'
import {testConfig} from 'src/user/tests/user.config.test'
import {UserController} from '../user.controller'
describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      ...testConfig
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
