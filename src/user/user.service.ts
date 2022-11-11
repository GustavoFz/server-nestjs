import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {

    const userExists = await this.prisma.user.findFirst({
      where: { email: data.email }
    })

    if (userExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await bcrypt.hash(data.password, 8)

    data.password = passwordHash;

    const user = await this.prisma.user.create({ data })

    return user;
  };

  async findAll() {
    return await this.prisma.user.findMany()
  };

  async findOne(id: number) {

    if (!id) {
      return { message: 'need id to find' }
    }
    return await this.prisma.user.findUnique({
      where: { id }
    })
  };

  async update(id: number, data: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

    return await this.prisma.user.update({
      data,
      where: { id }
    })
  };

  async delete(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

    return await this.prisma.user.delete({
      where: { id }
    })
  };
}
