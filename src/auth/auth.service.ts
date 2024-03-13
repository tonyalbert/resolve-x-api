import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    async signIn(email: string, password: string, type: string) {

        if (type !== 'user' && type !== 'operator') {
            return {
                error: true,
                message: 'Invalid type',
                data: null
            }
        }

        if (type === 'operator') {
          const operator = await prisma.operator.findUnique({
              where: {
                email
              },
              include: {
                Company: {
                  select: {
                    id: true
                  }
                },
              }
            });
        
            if (!operator) {
              return {
                error: true,
                message: 'Email not found',
                data: null
            }
          }

            const isPasswordValid = await bcrypt.compare(password, operator.password);

            if (!isPasswordValid) {
              return {
                error: true,
                message: 'Invalid password',
                data: null
              }
            }

            const payload = { id: operator.id, name: operator.name, email: operator.email, type: operator.type, companyId: operator.Company.id };

            return {
              error: false,
              message: 'Operator logged in successfully',
              data: {
                token: await this.jwtService.signAsync(payload),
              }
            }
        } else if (type === 'user') {
          const user = await prisma.user.findUnique({
            where: {
              email
            },
            include: {
              Company: {
                select: {
                  id: true
                }
              },
            }
          });
      
          if (!user) {
            return {
              error: true,
              message: 'Email not found',
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
      
          const payload = { id: user.id, name: user.name, email: user.email, type: user.type, companyId: user.Company.id };

          return {
            error: false,
            message: 'User logged in successfully',
            data: {
              token: await this.jwtService.signAsync(payload),
            }
          };
        }

    }
}
