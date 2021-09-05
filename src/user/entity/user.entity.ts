import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import PostEntity from 'src/post/entity/post.entity'
import CommentEntity from 'src/comment/entity/comment.entity'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({unique: true})
  email: string

  @Column({unique: true})
  username: string

  @Column()
  password: string

  @Column({nullable: true})
  profileImage: string

  @Column({default: false})
  isAdmin: boolean

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user, {cascade: true})
  posts: PostEntity[]

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, {cascade: true})
  comments: CommentEntity[]

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
