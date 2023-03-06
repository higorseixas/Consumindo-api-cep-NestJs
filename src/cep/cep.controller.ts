import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { get } from 'http';
import { CepService } from './cep.service';

@Controller('cep')
export class CepController {
  constructor(
    private readonly cepService: CepService,
    private httpService: HttpService,
  ) {}

  @Get('getAddress')
  @HttpCode(HttpStatus.OK)
  async getAddress(@Req() req) {
    return this.cepService
      .getAddress(req.query.cep)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  @Get('getCep')
  @HttpCode(HttpStatus.OK)
  async getCep(@Req() req) {
    return this.cepService
      .getCep(req.query.cep)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw new InternalServerErrorException();
      });
  }

  @Delete('deleteCep')
  @HttpCode(HttpCode.OK)
  async deleteCep(@Req() req) {
    return this.cepService
      .deleteCep(req.query.cep)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw new InternalServerErrorException();
      });
  }

  // @Get('allUsers')
  // @HttpCode(HttpStatus.OK)
  // async getUsers() {
  //   const users = await this.userService
  //     .getAllUsers()
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       throw new InternalServerErrorException();
  //     });
  //   return users;
  // }

  // @Get('getContactsByUser')
  // @HttpCode(HttpStatus.OK)
  // async getContactsByUserID(@Body() body) {
  //   const contacts = await this.userService
  //     .getContactsByUserId(body.id)
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       throw new InternalServerErrorException();
  //     });
  //   return contacts;
  // }

  // @Post('createUser')
  // @HttpCode(HttpStatus.OK)
  // async createUser(@Body() body) {
  //   const cretUser = await this.userService
  //     .createUser(body.nome, body.email)
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       throw new InternalServerErrorException();
  //     });
  //   return cretUser;
  // }

  // @Put('updateUser')
  // @HttpCode(HttpStatus.OK)
  // async updateUser(@Body() body) {
  //   const cretUser = await this.userService
  //     .updateUser(body.id, body.email)
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       throw new InternalServerErrorException();
  //     });
  //   return cretUser;
  // }
}
