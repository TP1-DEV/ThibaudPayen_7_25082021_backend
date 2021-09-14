import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import UserEntity from 'src/user/entity/user.entity'
import CommentEntity from 'src/comment/entity/comment.entity'
import { text } from 'express'

@Entity()
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({type: 'text'})
  content: string

  @Column({nullable: true})
  image: string

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {onDelete: 'CASCADE'})
  user: UserEntity

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, {cascade: true})
  comments: CommentEntity[]

  @ManyToMany(() => UserEntity)
  @JoinTable({name: 'likes'})
  userLikes: UserEntity[]
}
