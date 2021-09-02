import {Post} from 'src/post/entities/post.entity'
import {User} from 'src/user/entities/user.entity'
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comment: string

  @ManyToOne(() => Post, (post: Post) => post.comments, {onDelete: 'CASCADE'})
  post: Post

  @ManyToOne(() => User, (user: User) => user.comments, {onDelete: 'CASCADE'})
  user: User
}
