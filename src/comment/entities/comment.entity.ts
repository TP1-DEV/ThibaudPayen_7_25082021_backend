import {Post} from 'src/post/entities/post.entity'
import {User} from 'src/user/entities/user.entity'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  content: string

  @ManyToOne(() => Post, (post: Post) => post.comments)
  post: Post

  @ManyToOne(() => User, (user: User) => user.comments)
  user: User
}
