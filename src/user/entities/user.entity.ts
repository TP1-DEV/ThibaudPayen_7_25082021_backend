import {Post} from 'src/post/entities/post.entity'
import {Comment} from 'src/comment/entities/comment.entity'
import {Role} from './user.interface'
import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
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

  @Column({type: 'enum', enum: Role, default: Role.USER})
  roles: Role[]

  @OneToMany(() => Post, (post: Post) => post.user, {cascade: true})
  posts: Post[]

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[]

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
