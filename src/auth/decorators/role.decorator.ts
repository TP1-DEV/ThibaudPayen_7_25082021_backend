import {SetMetadata} from '@nestjs/common'
import {Role} from '../../user/entities/user.interface'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
