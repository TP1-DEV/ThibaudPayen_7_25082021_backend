import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOneId(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
