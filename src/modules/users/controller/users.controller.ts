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
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../provider/users.service';
import { CreateUserDto } from '../dto/createUsers.dto';
import { UpdateUsersDto } from '../dto/updateUsers.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { LoggingInterceptor } from 'src/Interceptors/logging.interceptor';
import { HttpExceptionFilter } from 'src/exceptionFilters/custom.exception';
import { Users } from 'src/database/entities/user.entity';

export interface userDetails {
  id: number;
  name: string;
}
// @UseInterceptors(LoggingInterceptor) // full route interceptor // Controller-Level
@Controller('users')
@UseGuards(AuthGuard) // used for auth perpose
export class UsersController {
  constructor(private readonly usersService: UsersService ) {}

  @UseFilters(HttpExceptionFilter) // custom filter for status code and error handeling  
  @UseInterceptors(LoggingInterceptor) // we can set in three way in contoller top full route or seprate route or in globale route // Method-Level
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
    // throw new HttpException('Forbidden', 403); // if error comes in route it will show error in custom filters
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
