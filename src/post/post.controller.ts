import {Controller, Get, Post, Put, Param, Delete, UseGuards, Req} from '@nestjs/common'
import {PostService} from './post.service'
import {CreatePostDto} from './dto/create-post.dto'
import {UpdatePostDto} from './dto/update-post.dto'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {PoliciesGuard} from 'src/casl/guard/casl.guard'
import {CheckPolicies} from 'src/casl/decorator/casl.decorator'
import {AppAbility} from 'src/casl/casl-ability.factory'
import {Action} from 'src/casl/casl-action'
import PostEntity from './entity/post.entity'

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @Post()
  create(@Req() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findById(id)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, PostEntity))
  @Put(':id')
  update(@Param('id') id: string, @Req() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto)
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, PostEntity))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.delete(id)
  }
}
