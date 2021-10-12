import {Test, TestingModule} from '@nestjs/testing'
import {testConfig} from 'src/post/tests/post.config.test'
import {PostController} from '../post.controller'

describe('PostController', () => {
  let controller: PostController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      ...testConfig
    }).compile()

    controller = module.get<PostController>(PostController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
