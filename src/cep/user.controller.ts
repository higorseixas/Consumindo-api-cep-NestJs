import {
  Controller,
  Get,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('allUsers')
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    const users = await this.userService
      .getAllUsers()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
    return users;
  }

  @Get('getContactsByUser')
  @HttpCode(HttpStatus.OK)
  async getContactsByUserID(@Body() body) {
    const contacts = await this.userService
      .getContactsByUserId(body.id)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
    return contacts;
  }

  @Post('createUser')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() body) {
    const cretUser = await this.userService
      .createUser(body.nome, body.email)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
    return cretUser;
  }

  @Put('updateUser')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() body) {
    const cretUser = await this.userService
      .updateUser(body.id, body.email)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
    return cretUser;
  }
}
