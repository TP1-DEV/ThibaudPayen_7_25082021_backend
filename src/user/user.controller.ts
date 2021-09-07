import {Controller, Get, Post, Put, Param, Delete, UseGuards, Req} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Req() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
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
  async update(@Param('id') id: string, @Req() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() updateUserDto: UpdateUserDto) {
    return this.userService.delete(id, updateUserDto)
  }
}
