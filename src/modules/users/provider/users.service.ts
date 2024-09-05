import { Injectable } from '@nestjs/common';
import { userDetails } from '../controller/users.controller';

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

  createUser(data: userDetails) {
    return data;
  }

  updateUser(id: number, data: userDetails) {
    return { ...data, id: id };
  }

  deleteUser(id: number) {
    return { id: id, isDeleted: true };
  }
}
