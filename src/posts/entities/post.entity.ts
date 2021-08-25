import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

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

  @Column({nullable: true})
  postLiked: string
}
