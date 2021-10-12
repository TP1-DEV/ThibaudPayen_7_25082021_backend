import {Test, TestingModule} from '@nestjs/testing'
import {PostService} from '../post.service'
import {testConfig} from 'src/post/tests/post.config.test'
import {loadFixtures} from 'src/test/general.config.test'
import {Connection, getRepository} from 'typeorm'
import {CreatePostDto} from 'src/post/dto/create-post.dto'
import {customReq} from 'src/user/interface/user.interface'
import {UpdatePostDto} from 'src/post/dto/update-post.dto'
import User from 'src/user/entity/user.entity'
import Post from 'src/post/entity/post.entity'

describe('PostService', () => {
  let service: PostService
  let module: TestingModule
  beforeEach(async () => {
    module = await Test.createTestingModule(testConfig).compile()
    service = module.get<PostService>(PostService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create 1 post', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const createdPost = {
      title: 'le titre',
      content: 'le contenu'
    } as CreatePostDto

    const file = {
      filename: 'filename'
    } as Express.Multer.File

    const req = {
      user: {id: '1'} as User,
      protocol: 'https',
      get: (name: string): string | undefined => {
        return name + 'header'
      }
    } as customReq

    await service.create(req, createdPost, file)
    const posts = await getRepository(Post).find()
    expect(posts.length).toEqual(2)
    expect(posts[1].file).toEqual('https://hostheader/uploads/filename')
  })

  it('should update 1 post', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const updatePost = {
      title: 'le titre update',
      content: 'le contenu'
    } as UpdatePostDto

    const req = {
      user: {id: '1'} as User,
      protocol: 'https',
      get: (name: string): string | undefined => {
        return name + 'header'
      }
    } as customReq

    await service.update('1', req, updatePost)
    const post = await getRepository(Post).findOne({where: {id: '1'}})
    expect(post.title).toEqual('le titre update')
  })

  it('should delete 1 post', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const req = {
      user: {id: '1'} as User
    } as customReq
    await service.delete('1', req)
    const posts = await getRepository(Post).find()
    expect(posts.length).toEqual(0)
  })

  it('should get all posts', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const posts = await service.findAll()
    expect(posts.length).toEqual(1)
  })

  it('should get one post', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const post = await service.findById('1')
    expect(post.id).toEqual('1')
  })

  it('should get the number of likes on a post', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const likesCount = await service.getUserLikes('1')
    expect(likesCount).toEqual(1)
  })

  it('should like a post', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const req = {
      user: {id: '1'} as User
    } as customReq
    await service.likePost('1', req)
    const likesCount = await service.getUserLikes('1')
    expect(likesCount).toEqual(2)
  })

  afterEach(async () => {
    await module.close()
  })
})
