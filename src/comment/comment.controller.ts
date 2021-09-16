import {Controller, Get, Post, Put, Param, Delete, UseGuards, Req, Body} from '@nestjs/common'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import {customReq} from 'src/user/interface/user.interface'
import {CommentService} from './comment.service'
import {CreateCommentDto} from './dto/create-comment.dto'
import {UpdateCommentDto} from './dto/update-comment.dto'

@Controller(':id/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Param('id') id: string, @Req() req: customReq, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(id, req, createCommentDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.commentService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Req() req: customReq, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, req, updateCommentDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: customReq) {
    return this.commentService.delete(id, req)
  }
}
