import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Public } from 'src/utils/Decorator/Public';
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Res() response) {
    const ticket = await this.ticketService.create(createTicketDto);
    return ticket.error ? 
    response.status(400).json({ error: true, message: ticket.message, data: null }) :
    response.status(201).json({ error: false, message: ticket.message, data: ticket.data })
  }

  @Public()
  @Get()
  async findAll(@Res() response) {
    const tickets = await this.ticketService.findAll();
    return tickets.error ? 
    response.status(400).json({ error: true, message: tickets.message, data: null }) :
    response.status(200).json({ error: false, message: tickets.message, data: tickets.data })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const ticket = await this.ticketService.findOne(id);
    return ticket.error ? 
    response.status(400).json({ error: true, message: ticket.message, data: null }) :
    response.status(200).json({ error: false, message: ticket.message, data: ticket.data })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto, @Res() response) {
    const updatedTicket = await this.ticketService.update(id, updateTicketDto);
    return updatedTicket.error ? 
    response.status(400).json({ error: true, message: updatedTicket.message, data: null }) :
    response.status(200).json({ error: false, message: updatedTicket.message, data: updatedTicket.data })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const deletedTicket = await this.ticketService.remove(id);
    return deletedTicket.error ? 
    response.status(400).json({ error: true, message: deletedTicket.message, data: null }) :
    response.status(200).json({ error: false, message: deletedTicket.message, data: deletedTicket.data })
    
  }
}
