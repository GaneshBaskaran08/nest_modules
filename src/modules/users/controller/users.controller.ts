import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../provider/users.service';

export interface userDetails {
  id: number;
  name: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string[] {
    return this.usersService.findAll();
  }

  @Get('/name')
  getUserName(@Query('name') name:string){
    return this.usersService.getUserName(name);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() data: userDetails) {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: userDetails) {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
