import {FastifyRequest} from 'fastify'
import {User} from 'src/user/entities/user.entity'

export interface RequestWithUser extends FastifyRequest {
  user: User
}
