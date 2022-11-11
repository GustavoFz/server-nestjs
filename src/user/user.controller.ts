import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //@UseGuards(JwtGuard)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data)
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  // add dto to data
  async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
