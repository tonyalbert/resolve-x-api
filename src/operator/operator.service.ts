import { Injectable } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class OperatorService {
  async create(createOperatorDto: CreateOperatorDto) {
    try {
      const existingOperator = await prisma.operator.findUnique({
        where: {
          email: createOperatorDto.email
        }
      });

      if (existingOperator) {
        return {
          error: true,
          message: 'Operator already exists',
          data: null
        }
      }

      createOperatorDto.password = await bcrypt.hash(createOperatorDto.password, 10);

      const createdOperator = await prisma.operator.create({
        data: {
          name: createOperatorDto.name,
          email: createOperatorDto.email,
          password: createOperatorDto.password,
          phone: createOperatorDto.phone ? createOperatorDto.phone : '',
          position: createOperatorDto.position ? createOperatorDto.position : '',
          companyId: createOperatorDto.companyId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          position: true,
          type: true
        }
      });

      return {
        error: false,
        message: 'Operator created successfully',
        data: createdOperator
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
    const operators = await prisma.operator.findMany();
    return {
      error: false,
      message: 'Operators retrieved successfully',
      data: operators
    };
  }

  async findOne(id: string) {
    const operator = await prisma.operator.findUnique({
      where: {
        id
      }
    });

    if (!operator) {
      return {
        error: true,
        message: 'Operator not found',
        data: null
      }
    }

    return {
      error: false,
      message: 'Operator retrieved successfully',
      data: operator
    };
  }

  async update(id: string, updateOperatorDto: UpdateOperatorDto) {
    try {
      const operatorExists = await prisma.operator.findUnique({
        where: {
          id
        }
      });

      if (!operatorExists) {
        return {
          error: true,
          message: 'Operator not found',
          data: null
        }
      }

      if (updateOperatorDto.password) {
        updateOperatorDto.password = await bcrypt.hash(updateOperatorDto.password, 10);
      }

      const updatedOperator = await prisma.operator.update({
        where: {
          id
        },
        data: {
          name: updateOperatorDto.name ? updateOperatorDto.name : operatorExists.name,
          email: updateOperatorDto.email ? updateOperatorDto.email : operatorExists.email,
          password: updateOperatorDto.password ? updateOperatorDto.password : operatorExists.password,
          phone: updateOperatorDto.phone ? updateOperatorDto.phone : operatorExists.phone,
          position: updateOperatorDto.position ? updateOperatorDto.position : operatorExists.position,
          type: updateOperatorDto.type ? updateOperatorDto.type : operatorExists.type
        }
      });

      if (!updatedOperator) {
        return {
          error: true,
          message: 'Operator not updated',
          data: null
        }
      }

      return {
        error: false,
        message: 'Operator updated successfully',
        data: updatedOperator
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
      const operatorExists = await prisma.operator.findUnique({
        where: {
          id
        }
      });

      if (!operatorExists) {
        return {
          error: true,
          message: 'Operator not found',
          data: null
        }
      }

      const deletedOperator = await prisma.operator.delete({
        where: {
          id
        }
      });

      if (!deletedOperator) {
        return {
          error: true,
          message: 'Operator not deleted',
          data: null
        }
      }

      return {
        error: false,
        message: 'Operator deleted successfully',
        data: deletedOperator
      };
  } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }
}
