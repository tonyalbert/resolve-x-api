import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class CompanyService {

  async create(createCompanyDto: CreateCompanyDto) {

    const existingCompany = await prisma.company.findUnique({
      where: {
        cnpj: createCompanyDto.cnpj
      }
    });

    if (existingCompany) {
      return {
        error: true,
        message: 'Company already exists',
        data: null
      }
    }

    const createdCompany = await prisma.company.create({
      data: createCompanyDto,
    });

    return {
      error: false,
      message: 'Company created successfully',
      data: createdCompany
    };
  }

  async findAll() {
    const companies = await prisma.company.findMany({
      include: {
        operators: {
          select: {
            name: true,
            position: true,
            email: true,
            phone: true,
            tickets: true
          },
        },
        users: {
          select: {
            name: true,
            position: true,
            email: true,
            phone: true,
            tickets: true
          },
        }
      }
    });

    return {
      error: false,
      message: 'Companies retrieved successfully',
      data: companies
    };
  }

  async findOne(id: string) {
    const company = await prisma.company.findUnique({
      where: {
        id
      },
      include: {
        operators: {
          select: {
            name: true,
            position: true,
            email: true,
            phone: true,
            tickets: true
          },
        },
        users: {
          select: {
            name: true,
            position: true,
            email: true,
            phone: true,
            tickets: true
          },
        }
      }
    });

    if (!company) {
      return {
        error: true,
        message: 'Company not found',
        data: null
      }
    }

    return {
      error: false,
      message: 'Company retrieved successfully',
      data: company
    };
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {

    try {
      const companyExists = await prisma.company.findUnique({
        where: {
          id
        }
      });

      if (!companyExists) {
        return {
          error: true,
          message: 'Company not found',
          data: null
        }
      }

      const updatedCompany = await prisma.company.update({
        where: {
          id
        },
        data: updateCompanyDto
      });

      if (!updatedCompany) {
        return {
          error: true,
          message: 'Company not updated',
          data: null
        }
      }

      return {
        error: false,
        message: 'Company updated successfully',
        data: updatedCompany
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
    const companyExists = await prisma.company.findUnique({
      where: {
        id
      }
    });

    if (!companyExists) {
      return {
        error: true,
        message: 'Company not found',
        data: null
      }
    }

    const deletedCompany = await prisma.company.delete({
      where: {
        id
      }
    });

    if (!deletedCompany) {
      return {
        error: true,
        message: 'Company not deleted',
        data: null
      }
    }

    return {
      error: false,
      message: 'Company deleted successfully',
      data: companyExists
    };
  }
}
