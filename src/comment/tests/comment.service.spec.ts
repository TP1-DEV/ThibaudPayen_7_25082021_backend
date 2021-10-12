import {Test, TestingModule} from '@nestjs/testing'
import {CreateCommentDto} from 'src/comment/dto/create-comment.dto'
import {UpdateCommentDto} from 'src/comment/dto/update-comment.dto'
import {testConfig} from 'src/comment/tests/comment.config.test'
import {customReq} from 'src/user/interface/user.interface'
import {loadFixtures} from 'src/test/general.config.test'
import {Connection, getRepository} from 'typeorm'
import {CommentService} from '../comment.service'
import Comment from 'src/comment/entity/comment.entity'
import Post from 'src/post/entity/post.entity'
import User from 'src/user/entity/user.entity'

describe('CommentService', () => {
  let service: CommentService
  let module: TestingModule
  beforeEach(async () => {
    module = await Test.createTestingModule(testConfig).compile()

    service = module.get<CommentService>(CommentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a comment', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const posts = await getRepository(Post).find()

    const post = posts[0]
    const comment = {
      comment: 'commentaire'
    } as CreateCommentDto
    await service.create(post.id, {user: {id: '1'} as User} as customReq, comment)
    const comments = await getRepository(Comment).find()
    expect(comments.length).toEqual(2)
  })
  it('should delete comment', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    await service.delete('1', {user: {id: '1'} as User} as customReq)
    const comments = await getRepository(Comment).find()
    expect(comments.length).toEqual(0)
  })
  it('should find a comment', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const comment = await service.findById('1')
    expect(comment.comment).toEqual('commentaire')
  })
  it('should find all comments', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')

    const comments = await service.findByPost('1')
    expect(comments.length).toEqual(1)
    expect(comments[0].comment).toEqual('commentaire')
  })
  it('should update comment', async () => {
    await loadFixtures(module.get(Connection), __dirname + '/fixtures')
    const updatedComment = {
      comment: 'new commentaire'
    } as UpdateCommentDto
    await service.update('1', {user: {id: '1'} as User} as customReq, updatedComment)
    const comment = await getRepository(Comment).findOne({where: {id: '1'}})
    expect(comment.comment).toEqual('new commentaire')
  })

  afterEach(async () => {
    await module.close()
  })
})
