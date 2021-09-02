import {User} from 'src/user/entities/user.entity'
import {Comment} from 'src/comment/entities/comment.entity'
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

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

  @ManyToOne(() => User, (user: User) => user.posts, {onDelete: 'CASCADE'})
  user: User

  @OneToMany(() => Comment, (comment: Comment) => comment.post, {cascade: true})
  comments: Comment[]
}
