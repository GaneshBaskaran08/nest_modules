import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUsers.dto';
import { UpdateUsersDto } from '../dto/updateUsers.dto';

@Injectable()
export class UsersService {
  findAll(): string[] {
    return ['users'];
  }

  getUserName(name: string) {
    return { name: name };
  }

  findById(id: number) {
    return { id: id };
  }

  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  updateUser(id: number, updateUsersDto: UpdateUsersDto) {
    if(id) return { ...updateUsersDto };
  }

  deleteUser(id: number) {
    return { id: id, isDeleted: true };
  }
}
