import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUsers.dto';
import { UpdateUsersDto } from '../dto/updateUsers.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/user.entity';

// interface UserResponse extends User {}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    const listUsers = this.userRepository.find();
    return listUsers;
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
    if (id) return { ...updateUsersDto };
  }

  deleteUser(id: number) {
    return { id: id, isDeleted: true };
  }
}
