import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Req,
  Delete,
} from '@nestjs/common';
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
    const cepWithoutHifen = await this.cepService.removeDashFromCep(
      req.query.cep,
    );
    return this.cepService
      .getAddress(cepWithoutHifen)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  @Get('getAllCep')
  @HttpCode(HttpStatus.OK)
  async getAllCep() {
    const ceps = await this.cepService
      .getAllCep()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
    return ceps;
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
  @HttpCode(HttpStatus.OK)
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
}
