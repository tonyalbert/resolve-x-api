import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class TicketService {
  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticket = await prisma.ticket.create({
        data: createTicketDto,
      });
      
      return {
        error: false,
        message: 'Ticket created successfully',
        data: ticket
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
    const tickets = await prisma.ticket.findMany({
      include: {
        Company: true,
        Operator: {
          select: {
            name: true,
            position: true
          },
        },
        User: {
          select: {
            name: true,
            position: true
          },
        }
      }
    });
    return {
      error: false,
      message: 'Tickets retrieved successfully',
      data: tickets
    };
  }

  async findOne(id: string) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id
      },
      include: {
        Company: true,
        Operator: {
          select: {
            name: true,
            position: true
          },
        },
        User: {
          select: {
            name: true,
            position: true
          },
        }
      }
    });

    if (!ticket) {
      return {
        error: true,
        message: 'Ticket not found',
        data: null
      }
    }

    return {
      error: false,
      message: 'Ticket retrieved successfully',
      data: ticket
    };
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      const existingTicket = await prisma.ticket.findUnique({
        where: {
          id
        }
      });

      if (!existingTicket) {
        return {
          error: true,
          message: 'Ticket not found',
          data: null
        }
      }

      const updatedTicket = await prisma.ticket.update({
        where: {
          id
        },
        data: updateTicketDto
      });

      if (!updatedTicket) {
        return {
          error: true,
          message: 'Ticket not updated',
          data: null
        }
      }

      return {
        error: false,
        message: 'Ticket updated successfully',
        data: updatedTicket
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
      const ticketExists = await prisma.ticket.findUnique({
        where: {
          id
        }
      });

      if (!ticketExists) {
        return {
          error: true,
          message: 'Ticket not found',
          data: null
        }
      }

      const deletedTicket = await prisma.ticket.delete({
        where: {
          id
        }
      });

      if (!deletedTicket) {
        return {
          error: true,
          message: 'Ticket not deleted',
          data: null
        }
      }

      return {
        error: false,
        message: 'Ticket deleted successfully',
        data: deletedTicket
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
