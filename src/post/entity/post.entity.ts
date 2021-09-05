import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import CommentEntity from 'src/comment/entity/comment.entity'
import UserEntity from 'src/user/entity/user.entity'

@Entity()
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  content: string

  @Column({nullable: true})
  attachement: string

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {onDelete: 'CASCADE'})
  user: UserEntity

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, {cascade: true})
  comments: Comment[]

  userId: string
}
