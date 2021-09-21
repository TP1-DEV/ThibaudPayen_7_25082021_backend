import {Controller, Get, Post, Put, Param, Delete, UseGuards, Req, UseInterceptors, Body, UploadedFile} from '@nestjs/common'
import {customReq} from 'src/user/interface/user.interface'
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
  create(@Req() req: customReq, @Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
    return this.postService.create(req, createPostDto, file)
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

  @Get(':id/likes')
  getUserLikes(@Param('id') id: string) {
    return this.postService.getUserLikes(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Req() req: customReq, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, req, updatePostDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: customReq) {
    return this.postService.delete(id, req)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/likes')
  likePost(@Param('id') id: string, @Req() req: customReq) {
    return this.postService.likePost(id, req)
  }
}
