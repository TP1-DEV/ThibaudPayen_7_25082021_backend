import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import UserEntity from 'src/user/entity/user.entity'
import CommentEntity from 'src/comment/entity/comment.entity'

@Entity()
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({type: 'text'})
  content: string

  @Column({nullable: true})
  file: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {onDelete: 'CASCADE'})
  user: UserEntity

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, {cascade: true})
  comments: CommentEntity[]

  @ManyToMany(() => UserEntity)
  @JoinTable({name: 'likes'})
  userLikes: UserEntity[]
}
