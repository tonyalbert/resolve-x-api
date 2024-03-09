import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';

@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post()
  async create(@Body() createOperatorDto: CreateOperatorDto, @Res() response) {
    const createdOperator = await this.operatorService.create(createOperatorDto);
    return createdOperator.error ?
      response.status(400).json({ error: true, message: createdOperator.message, data: null }) :
      response.status(201).json({ error: false, message: createdOperator.message, data: createdOperator.data });
  }

  @Get()
  async findAll(@Res() response) {
    const operators = await this.operatorService.findAll();
    return operators.error ? 
      response.status(400).json({ error: true, message: operators.message, data: null }) :
      response.status(200).json({ error: false, message: operators.message, data: operators.data })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const operator = await this.operatorService.findOne(id);
    return operator.error ?
      response.status(400).json({ error: true, message: operator.message, data: null }) :
      response.status(200).json({ error: false, message: operator.message, data: operator.data })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOperatorDto: UpdateOperatorDto, @Res() response) {
    const updatedOperator = await this.operatorService.update(id, updateOperatorDto);
    return updatedOperator.error ?
      response.status(400).json({ error: true, message: updatedOperator.message, data: null }) :
      response.status(200).json({ error: false, message: updatedOperator.message, data: updatedOperator.data })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const deletedOperator = await this.operatorService.remove(id);
    return deletedOperator.error ?
      response.status(400).json({ error: true, message: deletedOperator.message, data: null }) :
      response.status(200).json({ error: false, message: deletedOperator.message, data: deletedOperator.data })
  }
}
