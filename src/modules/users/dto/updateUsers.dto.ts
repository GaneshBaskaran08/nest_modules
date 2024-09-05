import { CreateUserDto } from './createUsers.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUsersDto extends PartialType(CreateUserDto) {}
