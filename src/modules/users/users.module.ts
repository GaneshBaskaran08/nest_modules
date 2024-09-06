import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './provider/users.service';
import { Users } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
