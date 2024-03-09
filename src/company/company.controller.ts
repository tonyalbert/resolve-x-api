import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public } from 'src/utils/Decorator/Public';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto, @Res() response) {
    const createdCompany = await this.companyService.create(createCompanyDto);
    
    return createdCompany.error ?
      response.status(400).json({ error: true, message: createdCompany.message, data: null }) :
      response.status(201).json({ error: false, message: createdCompany.message, data: createdCompany.data })
  }

  @Public()
  @Get()
  async findAll(@Res() response) {
    const companies = await this.companyService.findAll();

    return companies.error ?
      response.status(400).json({ error: true, message: companies.message, data: null }) :
      response.status(200).json({ error: false, message: companies.message, data: companies.data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const company = await this.companyService.findOne(id);

    return company.error ?
      response.status(400).json({ error: true, message: company.message, data: null }) :
      response.status(200).json({ error: false, message: company.message, data: company.data });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @Res() response) {
    const updatedCompany = await this.companyService.update(id, updateCompanyDto);

    return updatedCompany.error ?
      response.status(400).json({ error: true, message: updatedCompany.message, data: null }) :
      response.status(200).json({ error: false, message: updatedCompany.message, data: updatedCompany.data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const deletedCompany = await this.companyService.remove(id);

    return deletedCompany.error ?
      response.status(400).json({ error: true, message: deletedCompany.message, data: null }) :
      response.status(200).json({ error: false, message: deletedCompany.message, data: deletedCompany.data });
  }
}
