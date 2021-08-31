import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards} from '@nestjs/common'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {CommentService} from './comment.service'
import {CreateCommentDto} from './dto/create-comment.dto'
import {UpdateCommentDto} from './dto/update-comment.dto'

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.commentService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id)
  }
}
