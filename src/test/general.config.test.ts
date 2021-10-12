import {TypeOrmModule} from '@nestjs/typeorm'
import * as path from 'path'
import Comment from 'src/comment/entity/comment.entity'
import Post from 'src/post/entity/post.entity'
import User from 'src/user/entity/user.entity'
import {Connection, getRepository} from 'typeorm'
import {Builder, fixturesIterator, Loader, Parser, Resolver} from 'typeorm-fixtures-cli/dist'

export const dbConfig = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: ':memory:',
  entities: [User, Post, Comment],
  dropSchema: true,
  autoLoadEntities: true,
  synchronize: true,
  logging: false
})

export const loadFixtures = async (connection: Connection, fixturesPath: string) => {
  const loader = new Loader()
  loader.load(path.resolve(fixturesPath))

  const resolver = new Resolver()
  const fixtures = resolver.resolve(loader.fixtureConfigs)
  const builder = new Builder(connection, new Parser())

  for (const fixture of fixturesIterator(fixtures)) {
    const entity = await builder.build(fixture)
    await getRepository(entity.constructor.name).save(entity)
  }
}
