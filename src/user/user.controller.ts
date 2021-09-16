import {Controller, Get, Post, Put, Param, Delete, UseGuards, Req, Body} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
import { customReq } from './interface/user.interface'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {    
    return this.userService.signUp(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/likes')
  async getUserLikes(@Param('id') id: string) {
    return this.userService.getUserLikes(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Req() req: customReq, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, req, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: customReq) {
    return this.userService.delete(id, req)
  }
}
