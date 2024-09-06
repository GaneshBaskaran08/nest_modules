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
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../provider/users.service';
import { CreateUserDto } from '../dto/createUsers.dto';
import { UpdateUsersDto } from '../dto/updateUsers.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { LoggingInterceptor } from 'src/Interceptors/logging.interceptor';

export interface userDetails {
  id: number;
  name: string;
}
// @UseInterceptors(LoggingInterceptor) // full rout interceptor // Controller-Level
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(LoggingInterceptor) // we can set in three way in contoller top full rout or seprate rout or in globale rout // Method-Level
  @Get()
  findAll(): string[] {
    return this.usersService.findAll();
  }

  @Get('/name')
  getUserName(@Query('name') name: string) {
    return this.usersService.getUserName(name);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUsersDto: UpdateUsersDto,
  ) {
    return this.usersService.updateUser(id, updateUsersDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
