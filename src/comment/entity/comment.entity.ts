import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import PostEntity from 'src/post/entity/post.entity'
import UserEntity from 'src/user/entity/user.entity'

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comment: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, {onDelete: 'CASCADE'})
  post: PostEntity

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments, {onDelete: 'CASCADE'})
  user: UserEntity
}
