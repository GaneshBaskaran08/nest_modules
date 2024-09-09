import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUsers.dto';
import { UpdateUsersDto } from '../dto/updateUsers.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/user.entity';
import { promises } from 'dns';

// interface UserResponse extends User {}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    const listUsers = await this.userRepository.find();
    return listUsers;
  }

  getUserName(name: string) {
    return { name: name };
  }

  async findById(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const createUser = await this.userRepository.save(createUserDto);
    return createUser;
  }

  async updateUser(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    this.userRepository.merge(user, updateUsersDto);
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    this.userRepository.remove(user);
    return { id: id, isDeleted: true };
  }
}
