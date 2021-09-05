import {Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects} from '@casl/ability'
import {Injectable} from '@nestjs/common'
import {Action} from './casl-action'
import PostEntity from 'src/post/entity/post.entity'
import UserEntity from 'src/user/entity/user.entity'

type Subjects = InferSubjects<typeof PostEntity | typeof UserEntity> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const {can, cannot, build} = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>)

    if (user.isAdmin) {
      can(Action.Manage, 'all') // read-write access to everything
    } else {
      can(Action.Read, 'all') // read-only access to everything
    }

    can(Action.Update, PostEntity, {userId: user.id})
    cannot(Action.Delete, PostEntity, {userId: user.id})

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
