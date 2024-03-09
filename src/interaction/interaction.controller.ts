import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  async create(@Body() createInteractionDto: CreateInteractionDto, @Res() response) {
    const interaction = await this.interactionService.create(createInteractionDto);
    
    return interaction.error ? 
    response.status(400).json({ error: true, message: interaction.message, data: null }) :
    response.status(201).json({ error: false, message: interaction.message, data: interaction.data })
  }

  @Get()
  async findAll(@Res() response) {
      const interactions = await this.interactionService.findAll();
      return interactions ? 
      response.status(200).json({ error: false, message: interactions.message, data: interactions.data }) :
      response.status(400).json({ error: true, message: interactions.message, data: null })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const interaction = await this.interactionService.findOne(id);
    return interaction ? 
    response.status(200).json({ error: false, message: interaction.message, data: interaction.data }) :
    response.status(400).json({ error: true, message: interaction.message, data: null })
  }

  @Get('/ticket/:ticketId')
  async findAllByTicketId(@Param('ticketId') ticketId: string, @Res() response) {
    const interactions = await this.interactionService.findAllByTicketId(ticketId);
    return interactions ? 
    response.status(200).json({ error: false, message: interactions.message, data: interactions.data }) :
    response.status(400).json({ error: true, message: interactions.message, data: null })
  }
}
