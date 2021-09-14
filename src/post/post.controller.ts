import {Controller, Get, Post, Put, Param, Delete, UseGuards, Req, UseInterceptors} from '@nestjs/common'
import {PostService} from './post.service'
import {CreatePostDto} from './dto/create-post.dto'
import {UpdatePostDto} from './dto/update-post.dto'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {FileInterceptor} from '@nestjs/platform-express'
import {diskStorage} from 'multer'
import {editFileName, imageFilter} from '../utils/multer.config'

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: editFileName
      }),
      fileFilter: imageFilter
    })
  )
  create(@Req() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/likes')
  getUserLikes(@Param('id') id: string) {
    return this.postService.getUserLikes(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Req() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() updatePostDto: UpdatePostDto) {
    return this.postService.delete(id, updatePostDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/likes')
  likePost(@Param('id') id: string, @Req() updatePostDto: UpdatePostDto) {
    return this.postService.likePost(id, updatePostDto)
  }
}
