import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: createUserDto.email
        }
      });

      if (existingUser) {
        return {
          error: true,
          message: 'User already exists',
          data: null
        }
      }

      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = await prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          phone: createUserDto.phone ? createUserDto.phone : '',
          position: createUserDto.position ? createUserDto.position : '',
          companyId: createUserDto.companyId
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          position: true,
          type: true,
          Company: true
        }
      });

      if (!createdUser) {
        return {
          error: true,
          message: 'User not created',
          data: null
        }
      }

      return {
        error: false,
        message: 'User created successfully',
        data: createdUser
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        position: true,
        type: true,
        Company: true
      }
    });

    return {
      error: false,
      message: 'Users retrieved successfully',
      data: users
    };
  }

  async findOne(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          position: true,
          type: true,
          Company: true
        }
      });

      if (!user) {
        return {
          error: true,
          message: 'User not found',
          data: null
        }
      }

      return {
        error: false,
        message: 'User retrieved successfully',
        data: user
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id
        }
      });

      if (!userExists) {
        return {
          error: true,
          message: 'User not found',
          data: null
        }
      }

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          name: updateUserDto.name ? updateUserDto.name : userExists.name,
          email: updateUserDto.email ? updateUserDto.email : userExists.email,
          password: updateUserDto.password ? updateUserDto.password : userExists.password,
          phone: updateUserDto.phone ? updateUserDto.phone : userExists.phone,
          position: updateUserDto.position ? updateUserDto.position : userExists.position,
          type: updateUserDto.type ? updateUserDto.type : userExists.type
        }
      });

      if (!updatedUser) {
        return {
          error: true,
          message: 'User not updated',
          data: null
        }
      }

      return {
        error: false,
        message: 'User updated successfully',
        data: updatedUser
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  async remove(id: string) {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id
        }
      });

      if (!userExists) {
        return {
          error: true,
          message: 'User not found',
          data: null
        }
      }

      const deletedUser = await prisma.user.delete({
        where: {
          id
        }
      });

      if (!deletedUser) {
        return {
          error: true,
          message: 'User not deleted',
          data: null
        }
      }

      return {
        error: false,
        message: 'User deleted successfully',
        data: deletedUser
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  async findOneByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return {
        error: true,
        message: 'User not found',
        data: null
      }
    }

    return user;

  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return {
        error: true,
        message: 'User not found',
        data: null
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        error: true,
        message: 'Invalid password',
        data: null
      }
    }

    return {
      error: false,
      message: 'User logged in successfully',
      data: user
    };

  }

}
