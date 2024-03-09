import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/utils/Decorator/Public';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response) {
    const createdUser = await this.userService.create(createUserDto);

    return createdUser.error ?
      response.status(400).json({ error: true, message: createdUser.message, data: null }) :
      response.status(201).json({ error: false, message: createdUser.message, data: createdUser.data })
  }

  @Get()
  async findAll(@Res() response) {
    const users = await this.userService.findAll();
    return users.error ?
      response.status(400).json({ error: true, message: users.message, data: null }) :
      response.status(200).json({ error: false, message: users.message, data: users.data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user.error ?
      { error: true, message: user.message, data: null } :
      { error: false, message: user.message, data: user.data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);

    return updatedUser.error ?
      { error: true, message: updatedUser.message, data: null } :
      { error: false, message: updatedUser.message, data: updatedUser.data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.remove(id);
    
    return deletedUser.error ?
      { error: true, message: deletedUser.message, data: null } :
      { error: false, message: deletedUser.message, data: deletedUser.data };
  }

  @Post('/login')
  async login(@Body() { email, password }) {
    return await this.userService.login(email, password);
  }

}
