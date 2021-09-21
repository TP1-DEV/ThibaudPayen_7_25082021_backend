import {BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import PostEntity from 'src/post/entity/post.entity'
import CommentEntity from 'src/comment/entity/comment.entity'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({unique: true})
  email: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  password: string

  @Column({nullable: true})
  profileImage: string

  @Column({default: false})
  isAdmin: boolean

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user, {cascade: true})
  posts: PostEntity[]

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, {cascade: true})
  comments: CommentEntity[]

  @ManyToMany(() => PostEntity)
  @JoinTable({name: 'likes'})
  postLikes: PostEntity[]

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
