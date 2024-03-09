import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class InteractionService {
  async create(createInteractionDto: CreateInteractionDto) {
    try {
      const interaction = await prisma.interaction.create({
        data: createInteractionDto
      })
  
      if (!interaction) {
        return {
          error: true,
          message: 'Error creating interaction',
          data: null
        }
      }
  
      return {
        error: false,
        message: 'Interaction created successfully',
        data: interaction
      }
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  async findAll() {
    const interactions = await prisma.interaction.findMany({
      include: {
        ticket: true,
        operator: {
          select: {
            name: true,
            position: true
          },
        },
        user: {
          select: {
            name: true,
            position: true
          },
        }
      }
    });
    return {
      error: false,
      message: 'Interactions retrieved successfully',
      data: interactions
    }
  }

  async findOne(id: string) {
    try {
      const interaction = await prisma.interaction.findUnique({
        where: {
          id
        },
        include: {
          ticket: true,
          operator: {
            select: {
              name: true,
              position: true
            },
          },
          user: {
            select: {
              name: true,
              position: true
            },
          }
        }
      });

      if (!interaction) {
        return {
          error: true,
          message: 'Interaction not found',
          data: null
        }
      }

      return {
        error: false,
        message: 'Interaction retrieved successfully',
        data: interaction
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null
      }
    }
  }

  async findAllByTicketId(ticketId: string) {
    try {
      const interactions = await prisma.interaction.findMany({
        where: {
          ticketId
        },
        include: {
          ticket: true,
          operator: {
            select: {
              name: true,
              position: true
            },
          },
          user: {
            select: {
              name: true,
              position: true
            },
          }
        }
      });

      if (!interactions) {
        return {
          error: true,
          message: 'Interactions not found',
          data: null
        }
      }

      return {
        error: false,
        message: 'Interactions retrieved successfully',
        data: interactions
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
