import {User} from 'src/users/entities/user.entity'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  content: string

  @Column({nullable: true})
  attachement: string

  @Column({nullable: true})
  postLiked: string

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User
}
