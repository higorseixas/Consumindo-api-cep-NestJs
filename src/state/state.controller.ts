import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Req,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(
    private readonly stateService: StateService,
    private httpService: HttpService,
  ) {}

  @Get('getAllState')
  @HttpCode(HttpStatus.OK)
  async getAllCep() {
    const ceps = await this.stateService
      .getAllState()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
    return ceps;
  }

  @Get('getState')
  @HttpCode(HttpStatus.OK)
  async getState(@Req() req) {
    return this.stateService
      .getState(req.query.estado)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw new InternalServerErrorException();
      });
  }

  @Post('createState')
  @HttpCode(HttpStatus.OK)
  async createState(@Req() req) {
    return await this.stateService
      .createState(req.query.uf, req.query.estado, req.query.localidade)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  @Put('updateState')
  @HttpCode(HttpStatus.OK)
  async updateState(@Req() req) {
    return await this.stateService
      .updateState(req.query.uf, req.query.estado, req.query.localidade)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  @Delete('deleteState')
  @HttpCode(HttpStatus.OK)
  async deleteState(@Req() req) {
    return this.stateService
      .deleteState(req.query.id, req.query.estado)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw new InternalServerErrorException();
      });
  }
}
