import {Post} from 'src/posts/entities/post.entity'
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
  profil: string

  @Column({nullable: true})
  bio: string

  @Column({nullable: true})
  userLikes: string

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[]

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
