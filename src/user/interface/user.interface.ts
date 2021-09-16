import {Request} from 'express'
import UserEntity from '../entity/user.entity'

export interface customReq extends Request {
  user: UserEntity
}
